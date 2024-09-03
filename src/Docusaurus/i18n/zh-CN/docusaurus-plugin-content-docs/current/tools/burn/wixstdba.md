---
sidebar_position: 2
---

# WixStandardBootstrapperApplication

WixStandardBootstrapperApplication (WixStdBA) 是与 WiX 一起提供的“标准”引导程序。WixStdBA 提供了一个简单、可自定义的向导式用户界面和典型的 BA 行为，如安装、升级和卸载。用户界面由“主题”文件提供，这些文件允许您在不需要更改 BA 代码的情况下更改外观（在一定限制内）。WixStdBA 是用 C++ 编写的，因此没有额外的系统要求。


## WixStdBA 主题

WixStdBA 包含在 WixToolset.Bal.wixext WiX 扩展 NuGet 包中。您需要引用该包才能使用 WixStdBA。

WixStdBA 包含几种主题可供选择，适用于 RTF 和超链接的许可证以及小型或大型对话框：

- WixStandardBootstrapperApplication.RtfLicense：在欢迎对话框中显示 RTF 许可证的小对话框
- WixStandardBootstrapperApplication.HyperlinkLicense：在欢迎对话框中显示带有可选超链接的许可证的小对话框
- WixStandardBootstrapperApplication.HyperlinkSidebarLicense：在欢迎对话框中显示带有可选超链接和较大图像的大对话框
- WixStandardBootstrapperApplication.RtfLargeLicense：在欢迎对话框中显示带有 RTF 许可证和可选版本号的大对话框
- WixStandardBootstrapperApplication.HyperlinkLargeLicense：在欢迎对话框中显示带有可选超链接和可选版本号的小对话框

您可以使用 [`WixStandardBootstrapperApplication` 元素](../../schema/bal/wixstandardbootstrapperapplication.md) 在捆绑包的 [`BootstrapperApplication` 元素](../../schema/wxs/bootstrapperapplication.md) 下指定 WixStdBA 和 WixStdBA 主题：

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

以下是 [`WixStandardBootstrapperApplication` 元素](../../schema/bal/wixstandardbootstrapperapplication.md) 上一些更有趣的属性：

| 属性 | 描述 |
| ---- | ---- |
| Theme | 控制选择哪个 WixStdBA 主题。 |
| LicenseFile | 指定一个 RTF 格式许可证的源文件（适用于 RTF 主题之一）。 |
| LicenseUrl | 指定 URL 作为超链接主题中许可证的目标。 |
| LogoFile | 指定主题图像的源文件。 |
| ShowVersion | 指定是否应显示捆绑包版本（在大型主题中）。 |


## WixStdBA 自定义主题

您可以完全替换 WixStdBA 的任何“标准”主题，使用您自己的主题。查看 [标准主题源文件](https://github.com/wixtoolset/wix/tree/HEAD/src/ext/Bal/stdbas/Resources)，以查看主题 XML 编写示例和 WixStdBA 期望的页面：

| 页面名称 | 描述 |
| -------- | ---- |
| Loading | 在捆绑包初始化并运行 Burn 的检测阶段时显示。 |
| Help | 当用户在捆绑包命令行请求帮助时显示。 |
| Install | 在捆绑包初次安装时显示。 |
| Modify | 在捆绑包安装后显示，以允许修复和卸载。 |
| Progress | 在安装（和修复）以及卸载期间显示。 |
| ProgressPassive | 在安装/修复/卸载的被动 UI 模式下显示的可选窗口。 |
| Success | 操作成功后显示。 |
| Failure | 操作失败后显示。 |


## WixStdBA 捆绑包变量

WixStdBA 设置以下捆绑包变量，您可以在主题文件中使用这些变量（例如，在条件中显示或隐藏特定的 UI 控件）和捆绑包编写（例如，通过将属性传递给捆绑包链中的包）：

| 变量 | 描述 |
| ---- | ---- |
| WixBundleFileVersion | 捆绑包 .exe 的文件版本 |
| WixStdBALanguageId | 用户界面的有效语言 |
| WixStdBARestartRequired | 如果需要重启（在设置操作完成后），则设置为 `1`。 |
| WixStdBAShowVersion | 如果 [`WixStandardBootstrapperApplication/@ShowVersion`](../../schema/bal/wixstandardbootstrapperapplication.md) 设置为 `yes`，则设置为 `1`。 |
| WixStdBASuppressOptionsUI | 如果 [`WixStandardBootstrapperApplication/@SuppressOptionsUI`](../../schema/bal/wixstandardbootstrapperapplication.md) 设置为 `yes`，则设置为 `1`。 |
| WixStdBAUpdateAvailable | 设置为通过 [`Bundle/@UpdateURL`](../../schema/wxs/bundle.md) 指向的源中指定的可用更新的最高版本。 |
