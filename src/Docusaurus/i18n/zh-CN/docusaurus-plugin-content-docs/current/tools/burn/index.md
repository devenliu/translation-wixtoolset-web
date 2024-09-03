---
sidebar_position: 10
---

# Burn 捆绑包

[`Bundle` 元素](../../schema/wxs/bundle.md) 是 Burn 捆绑包的顶级元素。它包含子元素，允许你指定 [要安装的包链](#chain)、提供用户体验的 [引导程序](#burnux)、自定义和 [内置变量](./builtin-variables.md)、[系统搜索](./searches.md) 以及其他所有定义捆绑包的功能。

```xml
<Wix
    xmlns="http://wixtoolset.org/schemas/v4/wxs"
    xmlns:bal="http://wixtoolset.org/schemas/v4/wxs/bal">

    <Bundle
        Name="$(BundleName)"
        Version="$(Version)"
        UpgradeCode="$(UpgradeCode)"
        Compressed="no"
        SplashScreenSourceFile="splashscreen.bmp">

        <BootstrapperApplication>
            <bal:WixStandardBootstrapperApplication
                LicenseUrl=""
                Theme="hyperlinkLicense" />
        </BootstrapperApplication>

        <Chain>
            <PackageGroupRef Id="BundlePackages" />
        </Chain>
    </Bundle>
</Wix>
```


## 捆绑包包链 {#chain}

Burn 支持以下类型的包：

| 包类型 | 描述 |
| ------ | ---- |
| [BundlePackage](../../schema/wxs/bundlepackage.md) | 另一个 Burn 捆绑包 .exe 文件 |
| [ExePackage](../../schema/wxs/exepackage.md) | 一个可执行的 .exe 安装程序 |
| [MsiPackage](../../schema/wxs/msipackage.md) | 一个 Windows Installer .msi 包 |
| [MspPackage](../../schema/wxs/msppackage.md) | 一个 Windows Installer .msp 补丁包 |
| [MsuPackage](../../schema/wxs/msupackage.md) | 一个 Windows 更新 .msu 包 |

要将包包含在捆绑包的包链中：

- 将包元素作为 [`Chain` 元素](../../schema/wxs/chain.md) 的子元素包含。
- 将包元素作为 [`PackageGroup` 元素](../../schema/wxs/packagegroup.md) 的子元素包含，并通过 [`PackageGroupRef` 元素](../../schema/wxs/packagegroupref.md) 将该包组包含在链中，该元素是 [`Chain` 元素](../../schema/wxs/chain.md) 的子元素。

例如：

```xml
<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">
    <Bundle>
        <Chain>
            <PackageGroupRef Id="BundlePackages" />

            <ExePackage
                DetectCondition="DetectedSomethingVariable"
                UninstallArguments="-uninstall"
                SourceFile="EndOfChain.exe" />
        </Chain>
    </Bundle>

    <Fragment>
        <PackageGroup Id="BundlePackages">
            <PackageGroupRef Id="PrereqPackages" />
            <MsiPackage Id="PackageA" SourceFile="PackageA.msi" />
            <MsiPackage Id="PackageB" SourceFile="PackageB.msi" />
        </PackageGroup>
    </Fragment>

    <Fragment>
        <PackageGroup Id="PrereqPackages">
            <MsiPackage SourceFile="Prereqs.msi">
                <MsiProperty Name="PREREQSONLY" Value="1" />
            </MsiPackage>
        </PackageGroup>
    </Fragment>
</Wix>
```


## 引导程序 {#burnux}

每个捆绑包需要一个引导程序（BA）来实现用户体验，包括业务逻辑和 UI。WiX 包含两个 BA：

- [`WixStandardBootstrapperApplication` (WixStdBA)](./wixstdba.md) 提供简单的向导式 UI 和典型的 BA 行为。UI 由 XML 文件提供，这些文件可以让你更改外观而无需更改 BA 的代码。WixStdBA 是用 C++ 编写的，因此没有额外的系统要求。
- `WixInternalUIBootstrapperApplication` (WixIUIBA) 提供典型的 BA 行为，并将 UI 委托给主要 MSI 包中定义的 UI。当你在 MSI 包中定义了复杂的 UI 并且不想将其转换为 BA 时，WixIUIBA 很有用。WixIUIBA 是用 C++ 编写的，因此没有额外的系统要求。

以下是如何将内置 BA 添加到捆绑包中的示例：

```xml
<Wix
    xmlns="http://wixtoolset.org/schemas/v4/wxs"
    xmlns:bal="http://wixtoolset.org/schemas/v4/wxs/bal">

    <Bundle>

        <BootstrapperApplication>
            <bal:WixStandardBootstrapperApplication
                LicenseUrl=""
                Theme="hyperlinkLicense" />
        </BootstrapperApplication>
```

你也可以创建一个完全自定义的引导程序，可以使用原生代码或托管代码。以下是如何在 WiX v4 中引用自定义原生代码 BA 的示例：

```xml
<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">
    <Bundle>
        <BootstrapperApplication>
            <BootstrapperApplicationDll
                Id="MyStandardBootstrapperApplication"
                SourceFile="bobstdba.dll" />
            <PayloadGroupRef
                Id="MyStandardBootstrapperApplicationPayloads" />
        </BootstrapperApplication>
```

...或在 WiX v5 中：

```xml
<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">
    <Bundle>
        <BootstrapperApplication SourceFile="bobstdba.exe">
            <PayloadGroupRef
                Id="MyStandardBootstrapperApplicationPayloads" />
        </BootstrapperApplication>
```

以下是如何引用一个用 .NET 6 编写的自定义托管代码 BA：

```xml
<Wix
    xmlns="http://wixtoolset.org/schemas/v4/wxs"
    xmlns:bal="http://wixtoolset.org/schemas/v4/wxs/bal">

    <Bundle>
        <BootstrapperApplication>
            <Payload SourceFile="MyBA.EarliestCoreMBA.deps.json" />
            <Payload SourceFile="MyBA.EarliestCoreMBA.dll"
                bal:BAFactoryAssembly="yes" />
            <Payload SourceFile="MyBA.EarliestCoreMBA.runtimeconfig.json" />
            <Payload SourceFile="mbanative.dll" />
            <Payload SourceFile="WixToolset.Mba.Core.dll" />
            <bal:WixDotNetCoreBootstrapperApplicationHost />
        </BootstrapperApplication>
```

...或在 WiX v5 中：

```xml
<Wix
    xmlns="http://wixtoolset.org/schemas/v4/wxs"
    xmlns:bal="http://wixtoolset.org/schemas/v4/wxs/bal">

    <Bundle>
        <BootstrapperApplication SourceFile="MyBA.EarliestCoreMBA.exe">
            <Payload SourceFile="MyBA.EarliestCoreMBA.deps.json" />
            <Payload SourceFile="MyBA.EarliestCoreMBA.dll" />
            <Payload SourceFile="MyBA.EarliestCoreMBA.runtimeconfig.json" />
            <Payload SourceFile="mbanative.dll" />
            <Payload SourceFile="WixToolset.Mba.Core.dll" />
        </BootstrapperApplication>
```
