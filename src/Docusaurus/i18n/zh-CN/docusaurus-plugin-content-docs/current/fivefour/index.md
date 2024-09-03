---
sidebar_position: 50
---

# WiX v5 适用于 WiX v4 用户

WiX v5 与 WiX v4 **高度** 兼容。WiX v5 延续了 WiX v4 的传统，并且提供了 .NET 工具和 MSBuild SDK 两种形式。WiX v5 语言使用与 WiX v4 相同的 XML 命名空间，并且 -- 除了几个例外 -- 向后兼容 WiX v4 语言。这意味着你不需要将你的 WiX v4 项目迁移到 WiX v5。


## WiX v5 语言更改

### 虚拟和可重写的符号

WiX 一直支持让安装程序开发者重写 WiX 或其扩展提供的默认值，例如自定义操作的调度时间。（从技术上讲，可重写性对任何人和任何地方都可用，但规范的例子是重写 WiX 扩展中的自定义操作调度，所以我们就以此为例。）这个功能通过让你指定某些内容为 `Overridable="yes"` 来实现，以便 _你的_ 版本优先于可重写的版本。例如，以下是 WiX v4 中 `WixToolset.Util.wixext` 中 `CloseApplications` 自定义操作的定义：

```xml
<InstallExecuteSequence>
    <Custom
        Action="$(var.Prefix)CloseApplications$(var.Suffix)"
        Before="InstallFiles"
        Overridable="yes"
        Condition="VersionNT &gt; 400" />
</InstallExecuteSequence>
```

要重新调度自定义操作，你可以使用以下内容：

```xml
<InstallExecuteSequence>
    <Custom
        Action="Wix4CloseApplications_$(sys.BUILDARCHSHORT)"
        After="InstallInitialize" />
</InstallExecuteSequence>
```

WiX v5 引入了符号标识符的 `virtual` 和 `override` 访问修饰符概念，这与 C# 和 C++ 等语言中的相同关键字非常相似：

- `virtual` 声明标识符可以被重写。
- `override` 声明标识符重写了相应的 `virtual` 标识符。

因此，现在 WiX 扩展使用 `virtual` 访问修饰符定义自定义操作的调度：

```xml
<InstallExecuteSequence>
    <Custom
        Action="virtual $(var.Prefix)CloseApplications$(var.Suffix)"
        Before="InstallFiles"
        Condition="VersionNT &gt; 400" />
</InstallExecuteSequence>
```

要重新调度它，请使用 `override` 访问修饰符来重写 `virtual` 符号提供的调度：

```xml
<InstallExecuteSequence>
    <Custom
        Action="override Wix4CloseApplications_$(sys.BUILDARCHSHORT)"
        After="InstallInitialize" />
</InstallExecuteSequence>
```

欲了解更多信息，请查看 [_虚拟符号_ WIP](https://github.com/wixtoolset/issues/issues/7913) 和相关的 [pull request](https://github.com/wixtoolset/wix/pull/475)。


## WiX v5 新的语言特性

### 文件收集

在 [GitHub 讨论](https://github.com/wixtoolset/issues/discussions) 和 [Stack Overflow](https://stackoverflow.com/questions/tagged/wix?sort=newest) 上，一个非常常见的问题是 "如何安装目录中的所有文件？" 在 WiX v4 及之前的版本中，答案通常是 "使用 Heat 和一些晦涩的 XSLT。" 在 WiX v5 中，使用 `Files`。

`Files` 接受通配符路径来包含 _和 排除_ 文件，遍历指定的目录，并为每个文件生成组件和文件。

结合此列表中的其他功能，你现在可以用相当紧凑的 WiX 编写来构建包含成千上万文件的包：

```xml
<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">
    <Package Name="MyProduct" Version="1.0.0.0" Manufacturer="Example Corporation" UpgradeCode="B0B15C00-1DC4-0374-A1D1-E902240936D5">
        <Files Include="path\to\files\**" />
    </Package>
</Wix>
```

通过排除选项，你可以排除需要特殊处理的文件，比如服务文件：

```xml
<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">
    <Package Name="MyService" ...>
        <Files Include="!(bindpath.bin)**">
            <!--
            不要收集服务文件，因为它需要手动编写（如下所示）。
            -->
            <Exclude Files="!(bindpath.bin)foo.exe" />
        </Files>

        <!--
        这个文件是一个服务，因此需要精心地手工编写。
        -->
        <Component>
            <File Source="!(bindpath.bin)foo.exe" />
            <ServiceInstall ... />
            <ServiceControl ... />
        <Component>
    </Package>
</Wix>
```

欲了解更多信息，请查看 [`Files` WIP](https://github.com/wixtoolset/issues/issues/7857)、相关的 [pull request](https://github.com/wixtoolset/wix/pull/489) 和 [`Files` 元素的架构文档](../schema/wxs/files.md)。


### 裸文件

[已经有一段时间了](https://joyofsetup.com/2009/12/31/simplifying-wix-component-authoring/)，WiX 支持了简化的编写方法，用于处理组件中只有一个文件的简单场景：

```xml
<Component>
    <File Source="foo.exe" />
</Component>
```

但是添加几十个文件这样的元素后，你就会开始怀疑是否真的需要那些几乎为空的 `Component` 元素。现在不必再困惑了。WiX v5 增加了对所谓“裸”文件的支持，WiX v5 添加了对所谓“裸文件”的支持，这些文件没有包含 `Component` 元素，从而避免了 XML 的开销。在可以出现 `Component` 元素的地方，`File` 元素也可以出现。在编译器中，WiX 会为每个文件自动生成适当的组件。简单的编写方法现在变得更简单了。

```xml
<ComponentGroup Id="Files" Directory="MyFolder" Subdirectory="bin">
  <File Source="foo.exe" />
  <File Source="bar.dll" />
  <File Source="baz.db" />
</ComponentGroup>
```

欲了解更多信息，请查看 [_裸文件_ WIP](https://github.com/wixtoolset/issues/issues/7696) 和相关的 [pull request](https://github.com/wixtoolset/wix/pull/479)。


### 默认的主要升级

欢迎来到第一个“提供合理默认值，让安装程序开发者不必一遍又一遍地指定无聊的内容”功能。

自 2010 年以来，编写主要升级一直很简单，但就像“裸文件”一样，有时编写那些不变的内容感觉有些多余。不过，正如我[当时](https://joyofsetup.com/2010/01/16/major-upgrades-now-easier-than-ever/)所说：

> 降级默认情况下是被阻止的，这要求你为启动条件消息指定一条消息。

然而，`virtual` 和 `override` 访问修饰符背后的部分动机是 WiX 现在可以包含一个 [_WiX 标准库_](https://github.com/wixtoolset/issues/issues/7914)，该标准库恰好可以包含一组默认的本地化字符串。这让我们能够解决“降级被阻止”消息的需求 —— 至少对讲美式英语的用户来说是这样。

因此，现在在 WiX v5 中，如果你的包没有定义主要升级（通过 `MajorUpgrade` 或传统的 `Upgrade` 元素），WiX 会自动为你生成一个。它使用美式英语字符串，所以如果你需要其他语言，可以通过本地化文件覆盖该本地化字符串：

```xml
<?xml version="1.0" encoding="utf-8"?>
<WixLocalization xmlns="http://wixtoolset.org/schemas/v4/wxl" Culture="en-US">
    <String Id="WixDowngradePreventedMessage" Value="[ProductName] does not support downgrading." />
</WixLocalization>
```

欲了解更多信息，请查看 [_默认主要升级行为和本地化错误消息_ WIP](https://github.com/wixtoolset/issues/issues/7605) 和相关的 [pull request](https://github.com/wixtoolset/wix/pull/478)。


### 默认安装文件夹

欢迎来到第二个“提供合理默认值，让安装程序开发者不必一遍又一遍地指定无聊的内容”功能。

WiX v4 消除了在 WiX 项目中编写目录所需的许多冗长内容——消除了 `TARGETDIR`，添加了 `StandardDirectory` 元素以及强大的 `Subdirectory` 属性。WiX v5 在此基础上更进一步，新增了一项功能：如果你引用了一个 ID 为 `INSTALLFOLDER` 的目录但没有定义它，WiX 会自动为你生成一个。这个默认的 `INSTALLFOLDER` 等同于以下 WiX 编写内容：

```xml
<StandardDirectory Id="ProgramFiles6432Folder">
    <Directory
        Id="INSTALLFOLDER"
        Name="!(bind.Property.Manufacturer) !(bind.Property.ProductName)"
    />
</StandardDirectory>
```

该目录的名称来源于 `Package/@Manufacturer` 和 `Package/@Name` 属性的值。

不用担心 —— 如果你已经有了这样的 `INSTALLFOLDER`，或者从未引用过具有该 ID 的目录，WiX 会尊重你的选择，不会强制在你的包中使用它自己的 `INSTALLFOLDER`。

欲了解更多信息，请查看 [_默认根目录_ WIP](https://github.com/wixtoolset/issues/issues/7588) 和相关的 [pull request](https://github.com/wixtoolset/wix/pull/435)。


### 默认功能

欢迎来到最后一个“提供合理默认值，让安装程序开发者不必一遍又一遍地指定无聊的内容”功能。

复杂的功能树已经过时了，但 MSI 仍然要求至少有一个功能。因此，如果你不需要多个功能，WiX 会为你创建一个，并自动将组件分配给它。

这就是默认功能功能。

同样地，如果你已经有一组 `Feature` 元素，WiX 会保留它们。此功能仅在你没有在包中编写任何功能时才会生效。

欲了解更多信息，请查看 [_默认功能_ WIP](https://github.com/wixtoolset/issues/issues/7581) 和相关的 [pull request](https://github.com/wixtoolset/wix/pull/424)。


## Burn

- [`ArpEntry`](../schema/wxs/arpentry.md) 支持 `AdditionalUninstallArguments` 属性，以将参数添加到卸载命令行，并支持 `UseUninstallString` 以指示 Burn 使用 `UninstallString` 值而不是默认的 `QuietUninstallString`。感谢 [@nirbar](https://github.com/nirbar) 提供的 [pull request](https://github.com/wixtoolset/wix/pull/471)。
- 引导程序现在是独立进程，而不是由 Burn 引擎托管，以提高可靠性和安全性。作为独立进程运行也增加了兼容性，因为 Burn 不再需要特殊支持来托管 .NET 或任何其他语言/运行时。想用 COBOL 编写引导程序？随你所愿。 [查看更多关于独立进程引导程序的信息。](oopbas.md)


## 扩展变更

- WixToolset.DifxApp.wixext 在 WiX v4 中已被弃用，并在 WiX v5 中被移除。（微软早在几年之前就已弃用底层的 DifxApp。）
- WixToolset.Firewall.wixext 现在支持现代 Windows 防火墙的功能。有关所有新功能的详细信息，请参见 [文档](../schema/firewall/firewallexception.md)。感谢 [@chrisbednarski](https://github.com/chrisbednarski) 的所有 [工作](https://github.com/wixtoolset/wix/pulls?q=is%3Apr+author%3Achrisbednarski)。
- WixToolset.Netfx.wixext 的 [DotNetCompatibilityCheck](../schema/netfx/dotnetcompatibilitycheck.md) 现在会在请求的平台与安装程序运行的平台不兼容时，将指定的属性设置为 13。感谢 [@apacker1](https://github.com/apacker1) 提供的 [pull request](https://github.com/wixtoolset/wix/pull/459)。
- WixToolset.Util.wixext 现在具有来自 [WixQueryOsWellKnownSID](../tools/wixext/wininfo.md#querywindowswellknownsids) 的以下 `_NODOMAIN` 属性：`WIX_ACCOUNT_ADMINISTRATORS_NODOMAIN`、`WIX_ACCOUNT_GUESTS_NODOMAIN`、`WIX_ACCOUNT_LOCALSERVICE_NODOMAIN`、`WIX_ACCOUNT_LOCALSYSTEM_NODOMAIN`、`WIX_ACCOUNT_NETWORKSERVICE_NODOMAIN` 和 `WIX_ACCOUNT_USERS_NODOMAIN`。感谢 [@mistoll](https://github.com/mistoll) 提供的 [pull request](https://github.com/wixtoolset/wix/pull/407)。

有关与构建捆绑包相关的其他扩展更改，请参见 [独立进程引导程序](oopbas.md)。
