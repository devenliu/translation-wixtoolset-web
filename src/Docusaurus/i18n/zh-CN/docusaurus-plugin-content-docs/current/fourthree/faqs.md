---
sidebar_position: 3
---

# 常见问题解答

## 转换包

### 转换 `Component/@Win64` 属性

在 WiX v3 的创作中，常见到类似以下的代码：

```xml
<?if $(var.Platform) = "x64"?>
  <?define IsWin64 = yes ?>
  <?define ProgramFilesFolder = ProgramFiles64Folder ?>
<?elseif $(var.Platform) = "x86" ?>
  <?define IsWin64 = no ?>
  <?define ProgramFilesFolder = ProgramFilesFolder ?>
<?elseif $(var.Platform) ~= "Arm64" ?>
  <?define IsWin64 = yes ?>
  <?define ProgramFilesFolder = ProgramFiles64Folder ?>
<?endif?>
```

然后重复使用 `IsWin64` 预处理器变量：

```xml
<Component ... Win64="$(var.IsWin64)">
```

WiX v3 不需要重复使用 `Win64` 属性。早在 [2010 年的历史记录](https://www.joyofsetup.com/2010/05/14/working-hard-or-hardly-working/#manually-marking-package-and-component-bitness) 中已指出，WiX 会根据编译时指定的架构自动标记组件。WiX v4 继续这一趋势，用阐明的 `Bitness` 属性替代了 `Win64` 属性，使得可以覆盖默认设置。

WiX v3 没有解决根 Program Files 文件夹 ID 的问题。WiX v4 引入了新的“标准”目录 `ProgramFiles6432Folder` 来解决这个问题。`ProgramFiles6432Folder` 自动解析为 x86 包的 `ProgramFilesFolder` 和 x64 或 Arm64 包的 `ProgramFiles64Folder`。

例如：

```xml
<Fragment>
  <StandardDirectory Id="ProgramFiles6432Folder">
    <Directory Id="CompanyFolder" Name="!(bind.Property.Manufacturer)">
      <Directory Id="INSTALLFOLDER" Name="!(bind.Property.ProductName)" />
    </Directory>
  </StandardDirectory>
</Fragment>
```

所有这些逻辑都基于你在构建时指定的平台，通过 `wix.exe` 命令行中的 `-arch` 开关或等效的 MSBuild 属性 `InstallerPlatform`。


### WiX v3 扩展在 WiX v4 中的映射 {#wixext34}

下表将 WiX v3 扩展映射到其 WiX v4 等效项：

| WiX v3 扩展 | WiX v4 扩展 | 文档 |
| ---------------- | ---------------- | ------------- |
| WixBalExtension | WixToolset.Bal.wixext | [Bal schema](../schema/bal/index.md) |
| WixComPlusExtension | WixToolset.ComPlus.wixext | [Complus schema](../schema/complus/index.md) |
| WixDependencyExtension | WixToolset.Dependency.wixext | [Dependency schema](../schema/dependency/index.md) |
| WixDifxAppExtension | WixToolset.DifxApp.wixext | [Difxapp schema](../schema/difxapp/index.md) |
| WixDirectXExtension | WixToolset.DirectX.wixext | [Directx schema](../schema/directx/index.md) |
| WixFirewallExtension | WixToolset.Firewall.wixext | [Firewall schema](../schema/firewall/index.md) |
| WixGamingExtension | n/a | 由于 Windows 功能已过时而被移除。 |
| WixHttpExtension | WixToolset.Http.wixext | [Http schema](../schema/http/index.md) |
| WixIIsExtension | WixToolset.Iis.wixext | [Iis schema](../schema/iis/index.md) |
| WixLuxExtension | n/a | Lux 未被带到 WiX v4 中。 |
| WixMsmqExtension | WixToolset.Msmq.wixext | [Msmq schema](../schema/msmq/index.md) |
| WixNetFxExtension | WixToolset.Netfx.wixext | [Netfx schema](../schema/netfx/index.md) |
| WixPSExtension | WixToolset.PowerShell.wixext | [Powershell schema](../schema/powershell/index.md) |
| WixSqlExtension | WixToolset.Sql.wixext | [Sql schema](../schema/sql/index.md) |
| WixTagExtension | n/a | 软件标签功能现在内置于核心工具集中。 |
| WixUIExtension | WixToolset.UI.wixext | [UI schema](../schema/ui/index.md) |
| WixUtilExtension | WixToolset.Util.wixext | [Util schema](../schema/util/index.md) |
| WixVSExtension | WixToolset.VisualStudio.wixext | [Vs schema](../schema/vs/index.md) |


### 转换自定义操作 ID {#customactionids}

在 WiX v4 的扩展中，自定义操作 ID 被重命名为 WiX v3 的来源，有两个原因：

1. 支持 WiX v4 针对 WiX v4 支持的所有三个平台（x86、x64 和 Arm64）的平台特定自定义操作。
2. 避免在构建使用 WiX v4 的包时，与使用 WiX v3 扩展自定义操作的合并模块冲突。（是的，这是一个令人烦恼的边缘情况。）

WiX v4 通过添加前缀来满足这些要求，允许我们对自定义操作进行版本控制，以便在它们的更改与先前版本不兼容时进行区分。目前，前缀为 `Wix4`（因为 WiX 团队充满了极具想象力的人）。在 WiX v5 中，如果某个特定的扩展做出了与 WiX v4 生成的自定义表不兼容的更改，该扩展将采用新的前缀，可能是类似 `Wix5` 的名称。但是，向后兼容的修复和更改不需要更改前缀。

后缀用于区分平台：

| 平台 | 后缀 |
| -------- | ------ |
| x86 | `_X86` |
| x64 | `_X64` |
| Arm64 | `_A64` |

例如，WiX v3 中的 `QueryNativeMachine` 自定义操作，在 WiX v4 中被命名为：

- `Wix4QueryNativeMachine_X86`
- `Wix4QueryNativeMachine_X64`
- `Wix4QueryNativeMachine_A64`

一些自定义操作已经有了 `Wix` 前缀。对于这些操作，新前缀会替代它。因此，例如，WiX v3 中的 `WixFailWhenDeferred` 自定义操作现在被命名为：

- `Wix4FailWhenDeferred_X86`
- `Wix4FailWhenDeferred_X64`
- `Wix4FailWhenDeferred_A64`

通常，这种更改是不可见的，因为扩展会为你处理前缀和后缀。这在 WiX v3 中也是如此，但一些自定义操作，如 `WixFailWhenDeferred` 没有在扩展中有自定义元素。通常这是因为不需要额外的信息。在 WiX v4 中，始终需要至少一项额外的信息：包构建的平台。因此，WiX v4 包含了如 [FailWhenDeferred](../schema/util/failwhendeferred.md) 这样的自定义元素，将自定义操作包含在你的包中，这样你就不必担心前缀和后缀。

其他对 WiX 自定义操作的引用必须使用完整的 ID，包括前缀和后缀。

### 引用标准的 WixUI 对话框集

在 WiX v3 中，你可以使用 `UIRef` 元素引用一个标准的 WixUI 对话框集：

```xml
<UIRef Id="WixUI_Mondo" />
```

WiX v4 引入了特定平台的自定义操作，因此需要使用一个编译器扩展：

1. 添加对 WixToolset.UI.wixext WiX 扩展的引用。
2. 将 WixToolset.UI.wixext WiX 扩展命名空间添加到你的 WiX 创作中。
3. 在你的 WiX 创作中添加 `WixUI` 元素。

例如：

```xml
<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs"
  xmlns:ui="http://wixtoolset.org/schemas/v4/wxs/ui">

  <Package ...>
      ...
      <ui:WixUI
        Id="WixUI_InstallDir"
        InstallDirectory="INSTALLFOLDER"
        />
  </Package>
</Wix>
```


### 转换自定义 WixUI 对话框集

由于 [WiX v4 支持特定平台的自定义操作](#customactionids)，在自定义 WixUI 对话框集时，尤其是在添加和删除对话框时，需要特别注意。[WixUI 文档描述了创建新自定义对话框集时的操作步骤。](../tools/wixext/wixui.md#addingremovingdialogs) 在将你使用 WiX v3 创建的自定义对话框集转换为 WiX v4 时，你需要进行类似的更改。关键点是将调用自定义操作的任何 `DoAction` 控件事件隔离出来，以创建特定平台的变体。WixUI 本身通过预处理指令 `?foreach?` 创建了三个片段，分别适用于 x86、x64 和 Arm64 平台。这些片段中的每一个都引用了与平台无关的 `UI`。你可以在 [GitHub](https://github.com/wixtoolset/wix4/tree/HEAD/src/ext/UI/wixlib) 上查看 WixUI 的定义。下面是基于 WixUI_InstallDir 的自定义对话框集的示例：

```xml
<?foreach WIXUIARCH in X86;X64;A64 ?>
<Fragment>
    <UI Id="InstallDir_SpecialDlg_$(WIXUIARCH)">
        <Publish
          Dialog="LicenseAgreementDlg"
          Control="Print"
          Event="DoAction"
          Value="WixUIPrintEula_$(WIXUIARCH)"
          />
        <Publish
          Dialog="BrowseDlg"
          Control="OK"
          Event="DoAction"
          Value="WixUIValidatePath_$(WIXUIARCH)"
          Order="3"
          Condition="NOT WIXUI_DONTVALIDATEPATH"
          />
        <Publish
          Dialog="InstallDirDlg"
          Control="Next"
          Event="DoAction"
          Value="WixUIValidatePath_$(WIXUIARCH)"
          Order="2"
          Condition="NOT WIXUI_DONTVALIDATEPATH"
          />
    </UI>

    <UIRef Id="InstallDir_SpecialDlg" />
</Fragment>
<?endforeach?>
```

你可以在 [GitHub](https://github.com/wixtoolset/wix4/tree/HEAD/src/ext/UI/test/WixToolsetTest.UI/TestData/InstallDir_SpecialDlg) 上查看此自定义对话框集的创作和测试代码。

当你使用 [`WixUI` 元素](../schema/ui/wixui.md) 引用一个 WixUI 对话框集或基于 WixUI 派生的自定义对话框集时，它会为正在构建的包的平台添加对特定平台 `UI` 的引用。然后，特定平台的 `UI` 会添加对与平台无关的 `UI` 的引用。


## 转换捆绑包

捆绑包和 Burn 引擎最初是在 WiX v3.6 中发布的。
总体而言，它们的工作效果相当不错，特别是针对它们的构建用途：Visual Studio 安装程序。
随着时间的推移，各种边缘情况变得越来越明显。
关于设计决策的许多反馈实际上是基于随机选择的。
v4 版的捆绑包包括许多较小的行为变化，以及一些新功能，这些都使得安装程序能够满足更广泛的受众需求。
在某种意义上，v4 包含了 Burn v2。
本页面旨在涵盖 Burn 引擎从 v3 到 v4 的所有行为变化。



### v3 版的变量 `string` 类型现在称为 `formatted`

在 v3 中，引擎几乎总是在使用变量值之前对其进行格式化。
例如，如果变量的字符串值是 `[WixBundleName] Installation`，且 `WixBundleName` 的值为 "My Bundle"，那么格式化后的值就是 "My Bundle Installation"。
当变量的值包含带有方括号的路径时，这就会导致问题，比如 "C:\\[WixBundleName]"。
在这种情况下，格式化后的值应该是 "C:\\[WixBundleName]"，而不是 "C:\My Bundle"。
在 v4 中，为此用例引入了一种新的字面字符串类型。

在 v4 中，必须使用 `Variable` 元素的 `formatted` 类型来获得 v3 的行为。
要指定字面变量，请使用 `string` 类型。

在 v4 中，所有内置的搜索都会将值保存为字面变量。
wixstdba 具有让用户通过文本框编辑变量值的功能。
在填充文本框时，它首先会格式化变量。
当将值从文本框保存到变量时，它会将其保存为字面变量。

在 v3 中，有一个地方在使用变量时没有对其进行格式化，那就是在评估条件时。
在 v4 中，它会对变量进行格式化。
例如在 v3 中，如果 `ParentVar` 的值是 "[NestedVar]" 而 `NestedVar` 的值是 "ABC"，那么条件 `ParentVar = "ABC"` 为假。
在 v4 中，如果 `ParentVar` 是格式化字符串变量，则该条件为真；如果 `ParentVar` 是字面字符串变量，则为假。

在 v3 中，另一个没有对变量进行格式化的地方是在 `Log` 元素的 `Prefix` 属性中。
v4 会格式化它，并且如果它是一个绝对路径，则会使用该路径（[3816](https://github.com/wixtoolset/issues/issues/3816)）。


### 条件运算符 `~<>` 在处理空字符串或 null 字符串时的工作方式不同

请参阅 [问题 5372](https://github.com/wixtoolset/issues/issues/5372)。

### 引导程序的向后兼容性保证

在 v3 中，BA 必须基于与捆绑包构建时使用的相同库（本机 BA 使用 balutil，托管 BA 使用 BootstrapperCore.dll）进行构建。
这是构建时的向后兼容性，因为 v3.x 从不允许对接口进行破坏性更改。
在 v4 中，该保证已被转换为二进制兼容性。
如果 BA 基于 v4.0 库构建，那么它可以用于任何版本在 \[4.0, 5.0) 范围内的 WiX 构建的任何捆绑包。
但是，如果 BA 是基于 v4.0.1 构建的，则可能需要对源代码进行一些更改。
例如，现有事件中新增了一个参数。

作为这些更改的一部分，现在所有事件都在最低级别返回 HRESULT。
如果事件需要 BA 返回诸如期望操作之类的内容，则会有一个单独的参数及其自己的枚举。

### BAFunctions 的向后兼容性保证及其 dll 在构建时的指定

v3 wixstdba 支持一种名为 BAFunctions 的可扩展机制，用户可以提供一个本机 dll，该 dll 会被调用以处理一些事件。
此接口的工作方式与 BA 接口相同，因此存在二进制兼容性，但没有源代码兼容性。

在 v3 中，该 dll 必须命名为 `BAFunctions.dll`。
在 v4 中，BAFunctions dll 必须在构建时使用 `bal:BAFunctions` 属性指定。

### x64 和 ARM64 捆绑包

在 v3 中，仅有 x86 捆绑包可用，这意味着所有 BA 必须是 x86 架构。
在 v4 中，捆绑包可以是 x86、x64 或 ARM64 架构。
所有 BA 的 dll 必须与捆绑包的架构相同，或是托管的 AnyCPU dll。


### wixstdba 行为变化

* [5267](https://github.com/wixtoolset/issues/issues/5267) 使 wixstdba 在布局过程中跳过检查 `bal:Condition`。

* [5927](https://github.com/wixtoolset/issues/issues/5927) 使 wixstdba 在基础情况下使用 `::DefDialogProc` 而不是 `::DefWindowProc`。

* [6537](https://github.com/wixtoolset/issues/issues/6537) 使得如果已安装了较新版本且 `bal:SuppressDowngradeError="yes"`，wixstdba 会直接跳到成功页面。

* 文件占用对话框现在显示为任务对话框，而不是主题中的页面（[PR](https://github.com/wixtoolset/wix4/pull/202)）。

* [6856](https://github.com/wixtoolset/issues/issues/6856) 使 wixstdba（以及其他使用 balretry 的用户）不再尝试重试因错误 1606 而失败的 MSI 包。

* [5499](https://github.com/wixtoolset/issues/issues/5499) 使得如果捆绑包需要重启且当前进程没有权限执行，wixstdba 会请求提升权限。

* 如果不显示完整 UI，wixstdba 将始终使用命令行中指定的操作。


### 升级 v3 托管引导程序

v4 添加了使用 .NET Core 托管 BA 的能力，但这不在此讨论范围内，因为 v3 仅支持 .NET Framework BA。
请注意，Microsoft 为较新版本的 .NET Core 选择了一个令人困惑的命名约定。
.NET 5+ 是与 .NET Framework 完全不同的运行时。
要使用 .NET 6+ 编写的 BA，请使用 `bal:WixDotNetCoreBootstrapperApplicationHost`，而不是 `bal:WixManagedBootstrapperApplicationHost`。
.NET 5 及更早版本不受支持，因为它们在 v4 发布时已经达到生命周期终止。

尽管 WixBA 目前未发布，但它仍可在 https://github.com/wixtoolset/wix4/tree/HEAD/src/test/burn/WixToolset.WixBA 中找到。
通过查看该文件夹和 `WixToolset.WixBA.csproj` 的历史记录，您基本上可以看到逐步升级 v3 MBA 的示例。
另一个可能有用的文件夹是 https://github.com/wixtoolset/wix4/tree/HEAD/src/test/burn/TestData/TestBA 。

在 v3 中，MBA 需要基于与捆绑包相同版本的 `BootstrapperCore.dll` 进行构建。
它们不需要将其作为有效负载包含在内，因为 Bal WiX 扩展会自动添加它。
但是，它们确实需要提供一个 `BootstrapperCore.config` 文件，以告知 MBA 主机支持哪个 .NET Framework 运行时以及哪个 DLL 包含 MBA。

在 v4 中，配置文件名为 `WixToolset.Mba.Host.config`。
MBA 必须使用 WixToolset.Mba.Core nuget 包，包中包含一个示例配置文件。
Bal WiX 扩展不会添加 WixToolset.Mba.Core.dll 或 mbanative.dll，因此必须将它们与 MBA 的所有其他依赖项一起添加。
MBA 项目应为 SDK 样式项目，并针对特定的 RID（例如 win-x86）进行构建。

根命名空间从 `Microsoft.Tools.WindowsInstallerXml.Bootstrapper` 更改为 `WixToolset.Mba.Core`。

在 v3 中，通过 `BootstrapperApplication` 属性指定 BootstrapperApplication。
在 v4 中，BA 程序集必须具有 `BootstrapperApplicationFactory` 属性，以指定 `IBootstrapperApplicationFactory`。


### 指定托管 BA 先决条件

在 v3 中，MBA 的先决条件通过魔法 WixVariable `WixMbaPrereqPackageId` 进行指定。
任何进一步的先决条件可以使用 `bal:PrereqSupportPackage` 属性进行指定。

在 v4 中，指定 MBA 先决条件的唯一方式是通过 `bal:PrereqPackage` 属性。
由于此属性不能在 `PackageGroupRef` 上指定，因此每个 NetFx 包组都有一个不同的版本，旨在与 MBA 一起使用。
例如，使用 `NetFx481WebAsPrereq` 作为 MBA 的先决条件，而不是 `NetFx481Web`。

### 先决条件 BA 的变化

在全 UI 模式下，如果提供了禁止重启的命令行选项，并且需要重启，则显示成功屏幕（[3957](https://github.com/wixtoolset/issues/issues/3957)），而不是消息框。

为了实现 [4718](https://github.com/wixtoolset/issues/issues/4718)，`bal:AlwaysInstallPrereqs` 属性被添加到 MBA 主机元素中。当设置为 "true" 时，主机将在尝试启动 .NET（Framework）运行时之前始终运行先决条件 BA（如果所有先决条件已安装，则 UI 不会显示）。否则，主机仅在无法加载 MBA 时显示先决条件 BA。无论如何，主机仅尝试运行先决条件 BA 一次。如果主机在允许先决条件 BA 安装先决条件后仍无法加载 MBA，则会显示一个带有先决条件 BA 的错误页面，然后退出。

### 移除 DisplayInternalUI

在 v3 中，捆绑包可以选择允许 `MsiPackage` 在安装过程中显示其内部 UI，方法是使用 `DisplayInternalUI` 属性。
许多人请求在其他操作期间也能显示内部 UI 以及在运行时选择是否显示它。
因此，在 v4 中，引擎将完全控制 MSI 的 UI 级别，并且 `DisplayInternalUI` 属性已被移除。

有两个内置的 BA 支持显示 MSI 的内部 UI。第一个是 `bal:WixInternalUIBootstrapperApplication`，这是 v4 中全新的内置 BA。（TODO: 链接到新 BA 的文档）

第二个是 wixstdba。
使用 `bal:DisplayInternalUICondition` 属性来控制何时显示 MSI 的 UI。
要获得与 v3 相同的行为，请使用 `bal:DisplayInternalUICondition="WixBundleAction = 6"`。


### 升级自定义 wixstdba 主题

由于 UI 库（thmutil）、XML 架构和内置主题进行了大量破坏性更改，因此不值得花时间尝试构建工具将 v3 主题转换为 v4。
查看内置主题并从其中之一重新构建您的主题：https://github.com/wixtoolset/wix/tree/v4.0.5/src/ext/Bal/wixstdba/Resources。

（TODO: 链接到关于所有新功能的文档）

以下是一些细微的变化：

* [4906](https://github.com/wixtoolset/issues/issues/4906) 使窗口的高度和宽度现在指代窗口客户端区域的高度和宽度，而不是窗口本身。

* [5843](https://github.com/wixtoolset/issues/issues/5843) 将 RichEdit 控件从 v3 使用的古老版本升级到新版本。

* [5250](https://github.com/wixtoolset/issues/issues/5250) 修复了自定义进度条中的一个错误，右侧与左侧的像素一起绘制的问题。


### 高 DPI 更改

v3 捆绑包总是 DPI 不感知的。
在 v4 中，默认的 DPI 感知为每监视器 V2。
有关更多信息，请参见 [`BootstrapperApplicationDll`](../schema/wxs/bootstrapperapplicationdll.md) 元素的 `DpiAwareness` 属性。

这可能会导致自定义 wixstdba 主题或捆绑包的启动画面中图像显示方式的变化。
如果捆绑包声明它支持 BA 的 UI 框架不支持的 DPI 感知级别，这也可能导致问题。

### balutil 和 WixToolset.Mba.Core 破坏性更改

* 删除了一些声明但从未被引擎使用的枚举和事件。

* `OnApplyNumberOfPhases` 被合并到 `OnApplyBegin` 中。

* 所有具有 `Begin` 事件的事件必须具有相应的 `Complete` 事件，反之亦然。在运行时，如果引擎向 BA 发送 `Begin` 事件，则必须发送相应的 `Complete` 事件，反之亦然。

* [5980](https://github.com/wixtoolset/issues/issues/5980) 要求传递给 `Apply` 的窗口句柄必须是有效的窗口句柄，以避免在执行 Windows Installer 包时出现挂起。

* `OnDetectTargetMsiPackage` 和 `OnPlanTargetMsiPackage` 被重命名为 `OnDetectPatchTargetPackage` 和 `OnPlanPatchTargetPackage`。

* 是否允许重启不再由引擎提供。
使用 `BalInfoParseCommandLine` 或托管的 `BootstrapperCommand.ParseCommandLine` 获取此信息。

* `OnSystemShutdown` 事件已被移除。
如果 BA 想要接收关机通知，它必须与操作系统集成，因为通知是时间敏感的，引擎需要及时响应以避免被终止。

* 现在在 `OnExecuteFilesInUse` 中提供源，并且引擎将 BA 的返回值传递回去而不进行修改。


### MsiPackage 检测的变化

* [3643](https://github.com/wixtoolset/issues/issues/3643) 更改了 MSI 包的检测方式，其中包括 Upgrade 表中的一行，用于检测其他升级代码的包，该行仅用于检测。在 v3 中，这会被检测为降级。在 v4 中，它被视为相关的 MSI 包，但不会被检测为降级。

* [6535](https://github.com/wixtoolset/issues/issues/6535) 使引擎在仅安装基础包时不会将小升级检测为存在。

### 相关捆绑包检测的变化

* 已注册但未缓存的相关捆绑包会被引擎忽略。
在 v4 中，BA 会在检测期间被告知所有已注册的相关捆绑包及其是否已缓存。
未缓存的相关捆绑包仍然不会被计划。

* 引擎在检测期间不再提供相关操作，因为它依赖于尚未决定的总体计划操作。
如果 BootstrapperApplication 想要知道当前捆绑包是否会降级相关捆绑包，它必须自行比较版本。

### 包缓存的变化

在 v3 中，如果捆绑包的包已安装，则引擎不会尝试缓存它。
这导致在捆绑包稍后想要修复包时出现问题，因为它不在缓存中 ([5125](https://github.com/wixtoolset/issues/issues/5125))。
在 v4 中，即使包已安装，只要执行的是缓存/安装总体操作且包请求存在，捆绑包也会始终尝试缓存包。

在这种新行为和关于为什么引擎在缓存设置为“无”时仍然缓存包的困惑之间，缓存类型被重命名为“移除”、“保留”、“强制”。

一些包类型，如 `MsiPackage`，不需要卸载源。
但是，回滚时需要源。
引擎现在会尝试始终缓存包以进行卸载，但缓存操作被认为是“非关键”的，适用于可以在没有源的情况下卸载的包。

### 检测时序的变化

在 v3（和 v4）中，捆绑包的典型执行过程如下：加载 BA，检测，计划，应用，关闭。
然而，有时 BA 会希望重新启动周期，因此重要的是确保引擎中的所有内部状态都得到适当重置。
此外，其中一个设计目标是仅检测会查询机器的状态。
有多个地方需要移动代码以实现这一目标：

* [4392](https://github.com/wixtoolset/issues/issues/4392) 使引擎在检测期间始终设置 WixBundleInstalled。

* 依赖检查所需的信息在检测期间从机器上收集，而不是在计划期间。

* `WixBundleAction` 直到计划阶段才设置。
虽然 `WixBundleCommandLineAction` 可以作为替代，但不建议依赖尚未决定的内容。

* 内置变量 `RebootPending` 也在每次检测期间重置。

### 计划变更

* [4539](https://github.com/wixtoolset/issues/issues/4539) 确保在缓存的整体操作期间不会触及相关捆绑包。

* 计划需要成功的检测。

* 在构建计划之前，从 BA 收集所有请求的状态。
这意味着包的计划操作将提供给 BA 在新的 `OnPlannedPackage` 中，而不是在 `OnPlanPackageComplete` 中。

* BA 选择在计划期间忽略向前兼容的捆绑包，而不是在检测期间。

* 在 v3 中，相关捆绑包的顺序由从注册表中枚举的顺序确定。
在 v4 中，它们按关系类型（检测、附加组件、补丁、依赖、升级）排序，然后按版本排序（较旧的捆绑包在前）。

* 对于请求状态 `BOOTSTRAPPER_REQUEST_STATE_FORCE_ABSENT`，即使未检测到包存在，引擎也会计划卸载该包。

* 在 v3 中，引擎在计划依赖操作时做了一些假设。
在 v4 中，所有依赖操作都是单独计划的，以便仅在需要时执行，并且可以正确回滚。
[6510](https://github.com/wixtoolset/issues/issues/6510) 是 v3 中行为不正确的一个示例。

* 如果任何相关捆绑包计划为降级，则跳过其余的计划。
然而，当从升级相关捆绑包运行捆绑包或捆绑包正在卸载时，降级相关捆绑包会被忽略。

* [7147](https://github.com/wixtoolset/issues/issues/7147) 使引擎不卸载被取代的 MSI 包。


### 执行变更

* [6195](https://github.com/wixtoolset/issues/issues/6195) 将所需的工作目录发送到 `::CreateProcess`，而不是在执行 ExePackages 时更改当前目录。

* 应用需要成功的计划。

* 执行计划后，BA 必须执行新的检测和计划，然后才能再次执行应用。

* [6668](https://github.com/wixtoolset/issues/issues/6668) 删除了指示需要重启的特定于捆绑包的注册表项。

* 在 v3 中，引擎假设所有使用 Burn 协议的 ExePackages 都是捆绑包。
在 v4 中，要获得与 v3 相同的行为，必须添加 `Bundle="yes"`，并且可以移除 `Protocol="burn"`。
它还会自动将 "-norestart" 添加到命令行中。

* 只有当捆绑包的注册也被删除时，捆绑包的依赖提供者才会被删除。

* [4039](https://github.com/wixtoolset/issues/issues/4039) 更改了更新 ARP 中安装大小的时间。

* 现在，引擎在应用过程中阻止了关键的关机请求，无论是在提升的进程中还是在未提升的进程中。
当收到关键关机请求时，它假设当前正在执行的包触发了重启。
它会做出响应，以便操作系统给它尽可能多的时间来让当前包完成并优雅地关闭，以便在重启后可以从中断的地方继续。

* 启动时解析命令行时，所有传递的路径都将被解析。
例如，在 v3 中，如果布局路径在命令行中指定为相对路径，并且 BA 更改了进程的当前目录，则目标路径将基于新的当前目录。

* 捆绑包 exe 的 SxS 清单指定它处理长路径。

* `ExePackage` 的退出代码由于与重启相关的代码并不总是正确翻译。

* [6762](https://github.com/wixtoolset/issues/issues/6762) 使引擎能够识别失败的重启代码，并在适当时返回这些代码（`ERROR_FAIL_REBOOT_REQUIRED` 和 `ERROR_FAIL_REBOOT_INITIATED`）。

* 如果可用，引擎现在使用提升的进程重新启动计算机。

* [3777](https://github.com/wixtoolset/issues/issues/3777) 使引擎在从命令行掩码变量值时进行变量名称的大小写不敏感比较。


### 活动引擎更改

当引擎正在运行一个阶段，如应用（Apply），引擎处于“活跃”状态，BA 被限制调用某些函数，如 `IBootstrapperEngine::SetLocalSource`。
引擎开始“活跃”和结束“活跃”的时机发生了微妙的变化，但不应被察觉。
这个限制已被添加到 `IBootstrapperEngine::SetUpdate`。
在 v3 中，这个限制在某些调用 `IBootstrapperApplication` 的情况下被解除，在 v4 中也在一些情况下被解除，比如 BA 调用 `SetUpdate` 的地方。

引擎现在在 `Elevate` 和 `Quit` 期间被激活。

所有在开始处理 `Quit` 后收到的 BA 请求都将被拒绝。

### 版本处理

在 v3 中，引擎中的所有版本都表示为 Major.Minor.Patch.Revision 的 64 位值，每个组件的最大值为 65535。
在 v4 中，所有版本都表示为字符串。
当引擎需要比较字符串时，使用 [WiX 版本](https://wixtoolset.org/docs/development/wips/burn-engine-semantic-versioning/) 的 SemVer 2.0。

`util:ProductSearch` 将不再忽略那些版本无法解析为 64 位表示的产品。

根据 [4808](https://github.com/wixtoolset/issues/issues/4808) 的要求，当现有版本与正在安装的捆绑包版本相同时，Burn 现在将升级捆绑包，而不是将它们并排安装。

### 隐藏变量

隐藏变量仅用于防止引擎记录其值。

隐藏变量不再加密，因为它们总是必须解密并发送到单独的进程以用于包中。
如果需要加密，则 BA 负责在设置变量之前加密，并在需要使用时解密。

变量不能同时是隐藏的和持久的。
在 v3 中，持久变量值始终以明文形式存储。

### util:RegistrySearch 更改

[5355](https://github.com/wixtoolset/issues/issues/5355) 更改了行为，不会在目标键或值缺失时清除变量。

### 注册变更

如多个问题中报告的 [4822](https://github.com/wixtoolset/issues/issues/4822)，v3 的捆绑包在某些情况下会保持注册状态，而在这些情况下大家认为它不应该。
捆绑包的注册状态现在应该更加直观，尽管确切的规则过于复杂，无法在此文档中详细说明。

当捆绑包注销时，它将尽力删除它可能添加的所有依赖注册。

当捆绑包执行缓存、安装、卸载、修改或修复时，它将确保捆绑包在应用的开始阶段被注册和缓存，无论它是否已经注册或缓存 ([5702](https://github.com/wixtoolset/issues/issues/5702))。

为了帮助用户在捆绑包注册“卡住”时避免使用注册表清理工具，添加了一些新的命令行选项。

* `-burn.ignoredependencies=ALL` 表示引擎将跳过对将要卸载的包和相关捆绑包的依赖检查。

* `/unsafeuninstall` 表示引擎将在应用结束时始终注销自身。


### 缓存变更

在 v3 中，引擎尝试检测单个有效负载，以便也能单独规划它们。这导致了问题，因为在检测期间未进行完整验证，也没有在应用期间向 BA 提供足够的进度。
在 v4 中，如果包的任何有效负载存在于包缓存中，则该包被认为是缓存的。此信息用于有关捆绑包何时应保留其注册的规则，但不用于确定在应用期间是否应缓存包。
计划现在仅包括包的缓存操作，而不包括有效负载或容器。

引擎现在在每次应用期间都对包进行完整验证，如果它计划缓存包的话。
BA 始终会被告知有效负载的获取（下载或复制到临时缓存文件夹）、分发（将文件从临时缓存文件夹移动或复制到包缓存文件夹）和验证（验证 Authenticode 签名或哈希及文件大小）的进度。

对于正在缓存的包中的每个有效负载，引擎将首先尝试验证包缓存中的文件。
如果验证失败，则会从缓存中删除该文件，然后尝试获取它。
引擎将按排名顺序尝试从以下来源获取它：

1. 如果包含在容器中，则从容器中提取的临时缓存文件夹。
2. 如果包含在容器中，则从容器中。
3. 机器上的本地位置。
4. 下载网址。

`OnCacheAcquireResolving` 替代了 `OnResolveSource`。
这允许 BA 覆盖上述首选顺序。
BA 可以通过在 `OnCacheAcquireBegin` 中提供源来使引擎跳过其解析算法。
BA 还可以在 `OnCacheAcquireResolving` 或 `OnCacheAcquireComplete` 中提供源，但在这种情况下必须请求重试。

仅在用户在捆绑包的源代码中提供证书信息时才允许 Authenticode 验证。
在构建期间收集证书信息不再受支持。
有些有效负载必须在构建时提供源文件，例如 `MsiPackage` 的 .msi 文件。
对于这些有效负载，不可能使用 Authenticode 验证。
不再支持使用 `Catalog` 进行 Authenticode 验证。

如果引擎有有效负载的下载 URL 并且无法在本地找到它，则会建议下载。在 v3 中，BA 总是必须请求下载，但在 v4 中，BA 现在必须采取行动，如果不希望下载，则必须处理此情况。

在布局期间，所有缓存操作都在用户级别进程中执行，而不是提升的进程中。

当 `WixBundleOriginalSource` 设置且该位置的文件存在且大小正确时，优先选择该位置的附加容器 ([5586](https://github.com/wixtoolset/issues/issues/5586))。


### 回滚变更

#### 非关键回滚边界中的错误

[6309](https://github.com/wixtoolset/issues/issues/6309) 使其按照文档进行工作 - 如果包在非关键回滚边界内失败，则链应在下一个回滚边界处继续成功。在 v3 中，回滚边界中的其余包会被执行。

#### 阻止回滚有依赖的包

使用自定义提供程序键，捆绑包的包在安装之前可能会有依赖项。
在 v4 中，如果有这种情况，捆绑包将不会回滚该包。

#### 重新安装升级相关的捆绑包

[3421](https://github.com/wixtoolset/issues/issues/3421) - 当捆绑包安装失败并且具有升级相关的捆绑包时，它将在回滚期间以安装操作运行这些捆绑包。


### 提升进程的清理路径

提升进程的清理路径现在遵循系统级 `TMP`/`TEMP` 环境变量，而不是使用 Windows 目录中的硬编码临时文件夹。
在较新的 Windows 版本中，如果以 SYSTEM 身份运行，它会使用 C:\Windows\SystemTemp。

可以通过命令行或通过注册表中的策略覆盖此设置 ([5856](https://github.com/wixtoolset/issues/issues/5856))。

### 混合捆绑包元素与非捆绑包元素

在 v3 中，一个常见的错误是尝试在捆绑包中使用 MSI 元素，例如 NetFx 检测属性。
在 v4 中，这将生成警告。
例如：

> 警告 WIX1150：绑定器不知道如何将以下符号放置到输出中：符号名称：'CustomAction'，ID：'Wix4NetFxScheduleNativeImage_X64'

不幸的是，为了使这些警告不那么难以理解所需的更改被拒绝，因此可能很难确切地找出代码中造成此错误的原因。

### 推荐或要求 DetectCondition

引擎总是知道如何安装和卸载 Windows Installer 包，但需要帮助来卸载 ExePackages。
v3 有一些边缘情况，它会尝试卸载 ExePackage，即使用户没有指定任何卸载参数或如何检测它是否已安装。
现在在构建时会进行检查，以确保 ExePackage 包含合理的 `DetectCondition`、`UninstallArguments` 和 `Permanent` 属性组合。

在 v3 中，为 `UninstallCommand` 指定空字符串与不指定它是一样的。
在 v4 中，如果卸载命令行为空，则必须用空字符串指定 `UninstallArguments`。

### MsuPackages 不再可卸载

见 [6749](https://github.com/wixtoolset/issues/issues/6749)。

### 停止支持 XP

捆绑包仅支持 Vista SP2、Server 2008 SP2 或更高版本。

### 停止支持 SHA1

捆绑包在验证文件哈希时使用 SHA512 哈希算法，而不是 SHA1。

### 移除 BITS 支持

引擎不再支持 BITS 协议。

### `MsiPackage` 上 `Visible` 属性的默认值更改

对于 `Permanent="yes"` 的 `MsiPackage`，`Visible` 的默认值现在是 "yes"，而不是 "no"。

### 更准确地解析包含文件信息的捆绑包元素

v3 的编译器代码用于解析 `Payload` 元素，并重用了其他包含文件信息的元素，如 `BootstrapperApplication`。这意味着有时它解析了不应允许的属性。

### 编译时错误以防止运行时错误

在 v3 中，捆绑包可以以这样的方式构建，使引擎在运行时正常工作。
现在有一些场景成为构建错误，以防止这些运行时错误：

* 每个捆绑包中的包都有一个缓存 ID，需要唯一。

* 每个捆绑包中的负载都有一个相对文件路径，用于缓存或提取负载。
在 v4 中，会检测到冲突。

* 负载必须用于 BootstrapperApplication 或包/外部负载。

### 编译时错误以捕捉可能的错误

* 一个包不能分配给多个容器，因为引擎只支持一个。

* 所有包和回滚边界必须包含在链中。

* 所有负载必须由 BootstrapperApplication、包或作为外部负载引用。

* 更严格的检查以禁止保留的捆绑 ID。

### `wix convert` 需要处理的更改

#### BootstrapperApplicationDll

为了让 Bal 扩展包含正确的架构，`BootstrapperApplication` 元素更改为可以多次指定。
文件信息移动到新的 `BootstrapperApplicationDll` 元素。
在 v4 中，必须使用可选的 v3 元素 `bal:WixStandardBootstrapperApplication` 或 `bal:WixManagedBootstrapperApplicationHost`，并在 `Theme` 属性中指定主题，而不是使用 `BootstrapperApplicationRef`。

#### 用 BundleCustomData 替换 CustomTable

捆绑包包含一个用于 BA 的文件，其中包含有关捆绑包的数据，位于 BootstrapperApplicationData.xml 中。
在 v3 中，可以使用 `CustomTable` 向该文件添加任意数据。
在 v4 中，使用 `BundleCustomData` 替代。

#### 重命名 ExePackage 命令行属性

`InstallCommand`、`RepairCommand`、`UninstallCommand` 重命名为 `InstallArguments`、`RepairArguments`、`UninstallArguments`。

#### 重新设计 RemotePayload 和每个 Package 元素

像 `MsiPackage` 这样的元素实际上包含两个不同的概念 - 包的主要文件（例如 `SourceFile` 和 `DownloadUrl`）和有关如何以及何时（卸载）安装包的信息（例如 `InstallCondition` 和 `Permanent`）。
在 v4 中，包的主要文件信息应在新的元素中指定，例如 `MsiPackagePayload`。
为了向后兼容，只要子包负载元素未被指定，仍然允许在包元素上指定核心文件信息。
`RemotePayload` 被移除，必须使用适当的包负载代替。
