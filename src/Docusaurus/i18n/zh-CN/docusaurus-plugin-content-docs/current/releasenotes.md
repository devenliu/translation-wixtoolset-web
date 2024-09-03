---
sidebar_position: 30
---

# 发行说明

## WiX v5.0.1 {#v5}

WiX v5.0.1 于 2024 年 7 月 16 日发布，是 WiX v5 的第一个 bug 修复版。我们修复了 FireGiant 客户报告的 bug，并发布了此版本以供整个 WiX 社区使用。[查看 WiX v5.0.1 修复的所有 bug 列表。](https://github.com/wixtoolset/issues/milestone/28?closed=1)


### WiX v5 的新功能

WiX v5 标志着我们年度发布的开始。我们有意使 WiX v5 与 WiX v4 高度兼容。大多数用户可以直接切换到 WiX v5，无需更改代码。（当然，也有一些例外。）以下是一些值得注意的更改，主要是为了让你使用 WiX 打包体验更愉快的新功能：

| 功能 | 描述 |
| ---- | ---- |
| 内置文件收集 | 使用通配符在项目中包含文件。无需 Heat。 |
| 裸文件 | 简化仅包含文件的组件创建。 |
| 默认主要升级 | 获取典型的主要升级，无需 XML。 |
| 默认安装目录 | 获取典型的安装目录，无需 XML。 |
| 默认功能 | 获取典型的功能，无需 XML。 |
| 现代 Windows 防火墙支持 | WixToolset.Firewall.wixext 支持更多防火墙功能。可能需要进行少量的创作更改。 |
| 虚拟和可重写的符号 | 现在可以将可重写性应用于许多事情上。可能需要进行少量的创作更改。 |
| 进程外引导程序 | 引导程序不再托管在 Burn 进程中，以提高可靠性、安全性和兼容性。自定义引导程序将需要更改源代码。 |

[在 `WiX v5 适用于 WiX v4 用户` 中阅读更多信息。](fivefour/index.md)


### 以前的 WiX v5 发布

- WiX v5.0.0 于 2024 年 4 月 5 日发布，纪念 WiX 第一次开源发布的 20 周年。该版本包含了 [少量错误的修复](https://github.com/wixtoolset/issues/milestone/26?closed=1)。
- WiX v5.0.0-rc.2 于 2024 年 3 月 22 日发布。该版本包含了 [少量错误的修复](https://github.com/wixtoolset/issues/milestone/24?closed=1) 以及 FireGiant 在 WiX v3.14.1 和 WiX v4.0.5 中修复的安全漏洞的更新。详细信息请参见 [FireGiant 博客文章](https://www.firegiant.com/blog/2024/3/22/wix-security-releases-available-redux/)，[第一个安全公告](https://github.com/wixtoolset/issues/security/advisories/GHSA-jx4p-m4wm-vvjg) 和 [第二个安全公告](https://github.com/wixtoolset/issues/security/advisories/GHSA-rf39-3f98-xr7r)。
- WiX v5.0.0-rc.1 于 2024 年 3 月 8 日发布。


### 贡献者

以下是对 WiX v5 做出贡献的人员：

- [@barnson](https://github.com/wixtoolset/Harvesters/commits?author=barnson)
- [@robmen](https://github.com/wixtoolset/Harvesters/commits?author=robmen)
- [@chrisbednarski](https://github.com/wixtoolset/Harvesters/commits?author=chrisbednarski)
- [@nirbar](https://github.com/wixtoolset/Harvesters/commits?author=nirbar)
- [@avjts](https://github.com/wixtoolset/Harvesters/commits?author=avjts)
- [@chrpai](https://github.com/wixtoolset/Harvesters/commits?author=chrpai)
- [@cpuwzd](https://github.com/wixtoolset/Harvesters/commits?author=cpuwzd)
- [@apacker1](https://github.com/wixtoolset/Harvesters/commits?author=apacker1)
- [@mosBrkr](https://github.com/wixtoolset/Harvesters/commits?author=mosBrkr)
- [@mistoll](https://github.com/wixtoolset/Harvesters/commits?author=mistoll)
- [@jespersh](https://github.com/wixtoolset/Harvesters/commits?author=jespersh)
- [@timberto](https://github.com/wixtoolset/Harvesters/commits?author=timberto)
- [@fyodorkor](https://github.com/wixtoolset/Harvesters/commits?author=fyodorkor)
- [@mwileczka](https://github.com/wixtoolset/Harvesters/commits?author=mwileczka)


## WiX v4.0.5 {#v4}


WiX v4.0.5 于 2024 年 3 月 22 日（星期五）发布，修复了两个安全漏洞。所有版本的 WiX 都受到此漏洞的影响。我们建议尽快升级到此版本。有关详细信息，请参阅 [the FireGiant 博客文章](https://www.firegiant.com/blog/2024/3/22/wix-security-releases-available-redux/)、 [第一个安全公告](https://github.com/wixtoolset/issues/security/advisories/GHSA-jx4p-m4wm-vvjg) 和 [第二个安全公告](https://github.com/wixtoolset/issues/security/advisories/GHSA-rf39-3f98-xr7r)


### 平台

- 核心工具集、扩展以及 Burn 都支持 Arm64 平台。
- WiX 扩展包含针对所构建包平台的特定自定义操作。例如，Arm64 包仅包含 Arm64 自定义操作，不依赖于 x86 仿真。


### 构建工具

- 与 WiX v3 不同，WiX v4 不需要在每个开发机器和构建镜像上安装。相反，WiX v4 遵循现代 .NET 模型，使用 NuGet 进行工具交付。
  - WiX v4 MSBuild 项目是 SDK 风格的项目；MSBuild 和 NuGet 协同工作来下载 WiX v4 MSBuild SDK NuGet 包。
  - 支持 .NET Framework MSBuild 和 `dotnet build`。
  - 要从命令行构建包，WiX v4 可作为 .NET 工具使用，该工具也是一个 NuGet 包。
  - WiX 扩展作为 NuGet 包交付，可从 MSBuild 项目通过 `PackageReference` 和 WiX .NET 工具中使用。
- 对于命令行爱好者，大多数可执行文件已合并为单个 `wix.exe` 工具，并提供命令。例如，在 WiX v3 中，你可能会通过多次调用 Candle.exe 来编译你的作者文件，然后调用 Light.exe 来链接并绑定编译后的文件到 .msi 包中。在 WiX v4 中使用 `wix.exe`，这变成一个命令：`wix build -o product.msi product.wxs`。
- 构建补丁变得更加简单（一个命令！），并且可以使用 MSI 包作为目标和更新文件的源。
- WiX 扩展性模型和管道集成得到了显著增强。
- WiX 语言进一步简化。例如：
  - [`Package` 元素](./schema/wxs/package.md) 结合了 WiX v3 中的两个元素（`Product` 和 `Package`）。
  - [`StandardDirectory` 元素](./schema/wxs/standarddirectory.md) 简化了标准 Windows Installer 目录的使用。
  - 例如，[`Component` 元素](./schema/wxs/component.md) 上的 `Subdirectory` 属性允许你在不使用嵌套 [`Directory` 元素](./schema/wxs/directory.md) 的情况下创建子目录。
  - WiX 会提供一个默认的 [`MediaTemplate` 元素](./schema/wxs/mediatemplate.md)，如果你在创作时没有指定的话。
- 当在捆绑包中混合 MSI 包的创作时，WiX 会发出警告，反之亦然。


### Burn, 捆绑包和引导程序

- Burn 引擎是平台特定的，因此可以构建仅包含 x64 代码的 x64 捆绑包，而不依赖于 WoW64。
- .NET 6 及更高版本是编写托管代码引导程序的支持平台。也支持 .NET Framework。
- ThmUtil 是由 WixStdBA 引导程序使用的本机代码 UI 库，支持新的控件以及创作条件和操作，这些控件允许主题添加功能，而无需编写自定义 C++ 代码。有关详细信息，请参阅 [Thmutil schema](./schema/thmutil/index.md).
- ThmUtil（以及 WixStdBA）支持高 DPI 显示设置。
- 新的 [`WixInternalUIBootstrapperApplication`](./schema/bal/wixinternaluibootstrapperapplication.md) BA 支持仅显示 MSI 包的内部或嵌入式 UI。
- Burn 通过 [`BundlePackage`](./schema/wxs/bundlepackage.md) 支持链中的其他捆绑包，以自动处理检测和卸载命令行。同样，[`ArpEntry` 元素](./schema/wxs/arpentry.md) 为链中的任意可执行包提供相同的功能。
- Burn 支持 SemVer 风格的版本。
- WixStdBA 支持如 [`Update` 元素](./schema/wxs/update.md) 中指定的捆绑包更新源。
- Burn 现在可以升级具有相同版本号的捆绑包。
- 当用户需要提升权限以重启（在 Windows Server 机器上常见）时，Burn 通过提升的引擎处理重启。
- 自定义引导程序可以在应用 MSI 包时更改使用的 `REINSTALLMODE`。
- Burn 策略注册表值 `EngineWorkingDirectory` 在 `HKLM\Software\Policies\Wix\Burn` 中是一个字符串，指定了一个工作文件夹根目录，用于当 `C:\Windows\Temp` 被安全策略阻止时的提升捆绑包。
- 如果捆绑包有一个需要重启的前提条件，而用户在重启后取消，则 Burn 不再出现在应用和功能（ARP）列表中。
- `/unsafeuninstall` 命令行开关允许用户尝试“强制”卸载捆绑包，即使依赖检查本来会使其保持安装状态。


### 弃用和删除

- 在 WiX v3 中已弃用的功能，包括在 WiX v3.14 中弃用的命令行开关，已从 WiX v4 中删除。
- WiX v4 中已删除 WixGamingExtension 和 WixLuxExtension。
- WixDifxAppExtension 在 Windows 10 中已弃用，因此在 WiX v4 中也已弃用，并将在 WiX v5 中删除。


## 以前的 WiX v4 发布

> WiX v4.0.4 发布于 2024 年 2 月 6 日，星期二

WiX v4.0.4 缓解了 Burn 中的 Windows DLL 重定向漏洞。所有版本的 WiX 都受到此漏洞的影响。我们建议尽快升级到此版本（或更高版本）。

> WiX v4.0.3 发布于 2023 年 11 月 13 日，星期一

WiX v4.0.3 是 WiX v4 的一个维护版本，修复了 [少量更小的错误](https://github.com/wixtoolset/issues/milestone/23?closed=1)。

> WiX v4.0.2 发布于 2023 年 9 月 13 日，星期三

WiX v4.0.2 是 WiX v4 的一个维护版本，修复了在 WiX v4.0.0 和 v4.0.1 中未被检测到的一些漏洞：

- **[build -outputType is ignored](https://github.com/wixtoolset/issues/issues/7708)**，来自 [@robmen](https://github.com/robmen)

- **[`NetFxDotNetCompatibilityCheck` custom action badly fragmented](https://github.com/wixtoolset/issues/issues/7677)**，来自 [@barnson](https://github.com/barnson)

- **[Substitution does not create ModuleSubstitution table when building Merge Module](https://github.com/wixtoolset/issues/issues/7559)**，来自 [@rsdk-vag](https://github.com/rsdk-vag)

- **[RegisterFonts action is not added to the InstallExecuteSequence when fonts are being installed to the FontsFolder.](https://github.com/wixtoolset/issues/issues/7593)**，来自 [@kerrywicks](https://github.com/kerrywicks)

- **[Migrated WiX v3 to v4, now getting error doing action Wix4ConfigureSmbUninstall_X64 when installing](https://github.com/wixtoolset/issues/issues/7632)**，来自 [@barnson](https://github.com/barnson)

- **[IWindowsInstallerDecompileContext.TreatProductAsModule is borked](https://github.com/wixtoolset/issues/issues/7607)**，来自 [@barnson](https://github.com/barnson)

- **[`wix msi decompile -x` removes modularization GUIDs from object fields](https://github.com/wixtoolset/issues/issues/7574)**，来自 [@barnson](https://github.com/barnson)

- **[Merge modules don't extract during decompilation](https://github.com/wixtoolset/issues/issues/7568)**，来自 [@barnson](https://github.com/barnson)

WiX v4.0.0 和 v4.0.1 中的所有优点仍然保留。


> WiX v4.0.1 发布于 2023 年 6 月 5 日，星期一

WiX v4.0.1 是 WiX v4 的维护版本，[修复了在 WiX v4.0.0 中未被发现的若干烦人问题和更严重的错误](https://github.com/wixtoolset/issues/milestone/20?closed=1)。


> WiX v4.0.0 发布于 2023 年 4 月 5 日，星期三


### 贡献者

[@robmen](https://github.com/wixtoolset/wix4/commits?author=robmen)、 [@rseanhall](https://github.com/wixtoolset/wix4/commits?author=rseanhall) 和 [@barnson](https://github.com/wixtoolset/wix4/commits?author=barnson) 在 WiX v4 的开发过程中认真履行了维护职责。他们还得到了许多其他人的支持，我们对此表示感谢！

- [@cpuwzd](https://github.com/wixtoolset/wix4/commits?author=cpuwzd)
- [@nirbar](https://github.com/wixtoolset/wix4/commits?author=nirbar)
- [@japarson](https://github.com/wixtoolset/wix4/commits?author=japarson)
- [@drolevar](https://github.com/wixtoolset/wix4/commits?author=drolevar)
- [@MarkStega](https://github.com/wixtoolset/wix4/commits?author=MarkStega)
- [@hymccord](https://github.com/wixtoolset/wix4/commits?author=hymccord)
- [@jchoover](https://github.com/wixtoolset/wix4/commits?author=jchoover)
- [@AlexKubiesa](https://github.com/wixtoolset/wix4/commits?author=AlexKubiesa)
- [@wjk](https://github.com/wixtoolset/wix4/commits?author=wjk)
- [@maniglia](https://github.com/wixtoolset/Dtf/commits?author=maniglia)
- [@mcraiha](https://github.com/wixtoolset/wix4/commits?author=mcraiha)
- [@StefanStojanovic](https://github.com/wixtoolset/wix4/commits?author=StefanStojanovic)
- [@ericstj](https://github.com/wixtoolset/wix4/commits?author=ericstj)
- [@pascalpfeil](https://github.com/wixtoolset/wix4/commits?author=pascalpfeil)
- [@danielchalmers](https://github.com/wixtoolset/wix4/commits?author=danielchalmers)
- [@HarmvandenBrand](https://github.com/wixtoolset/wix4/commits?author=HarmvandenBrand)
- [@sgtatham](https://github.com/wixtoolset/wix4/commits?author=sgtatham)
- [@paulomorgado](https://github.com/wixtoolset/wix4/commits?author=paulomorgado)
- [@adnanshaheen](https://github.com/wixtoolset/wix4/commits?author=adnanshaheen)
- [@FroggieFrog](https://github.com/wixtoolset/wix4/commits?author=FroggieFrog)
- [@Herohtar](https://github.com/wixtoolset/wix4/commits?author=Herohtar)
- [@BMurri](https://github.com/wixtoolset/wix4/commits?author=BMurri)
- [@heaths](https://github.com/wixtoolset/wix4/commits?author=heaths)
- [@chrpai](https://github.com/wixtoolset/wix4/commits?author=chrpai)
- [@VolkerGa](https://github.com/wixtoolset/Dtf/commits?author=VolkerGa)
- [@t-johnson](https://github.com/wixtoolset/Harvesters/commits?author=t-johnson)


> Release Candidate 4 发布于 2023 年 3 月 17 日，星期五

WiX v4 Release Candidate 4 包含了 [修复了 -- 与 RC3 相比明显更少的 -- 在 Release Candidate 3 中报告的错误](https://github.com/wixtoolset/issues/issues?q=is%3Aissue+project%3Awixtoolset%2Fissues%2F6)。新增了一个小功能：

- 在 WixToolset.Netfx.wixext 中，现在可以使用 .NET Framework v4.8.1 的包组。详见 [issue](https://github.com/wixtoolset/issues/issues/7239) 和 [@barnson 的 pull request](https://github.com/wixtoolset/wix4/pull/368)。


> Release Candidate 3 发布于 2023 年 2 月 24 日，星期五

WiX v4 Release Candidate 3 包含了 [修复了在 Release Candidate 2 中报告的错误](https://github.com/wixtoolset/issues/issues?q=is%3Aissue+project%3Awixtoolset%2Fissues%2F5)。新增了两个小功能：

- WiX MSBuild 项目支持通过单个 `ProjectReference` 进行多目标项目引用。您可以指定多个平台、配置、.NET 框架和运行时标识符。详见 [@robmen 的 WIP](https://github.com/wixtoolset/issues/issues/7241) 和 [pull request](https://github.com/wixtoolset/wix4/pull/356)。
- 新增的 `sys.BUILDARCHSHORT` 内置预处理变量帮助处理 WiX v4 的新架构特定自定义操作。详见 [issue 7227](https://github.com/wixtoolset/issues/issues/7227) 和 [@barnson 的 PR](https://github.com/wixtoolset/wix4/pull/359)。


> Release Candidate 2 发布于 2023 年 1 月 20 日，星期五

WiX v4 Release Candidate 2 修复了在 Release Candidate 1 中报告的错误，并新增了两个功能：

- 向 `Package/@Scope` 选项添加 `perUserOrMachine`，用于双范围、单包的创作。详见 [issue #7137](https://github.com/wixtoolset/issues/issues/7137)、[@robmen 的代码 PR](https://github.com/wixtoolset/wix4/pull/327) 和 [文档 PR](https://github.com/wixtoolset/web/pull/138)。
- 添加 `DotNetCoreSdkSearch` Burn 搜索，用于查找 .NET (Core) SDK，就像 `DotNetCoreSearch` 搜索用于 .NET 运行时。详见 [issue #7058](https://github.com/wixtoolset/issues/issues/7058)、[@powercode 的代码 PR](https://github.com/wixtoolset/wix4/pull/294) 和 [@rseanhall 的文档 PR](https://github.com/wixtoolset/web/pull/141)。


> Release Candidate 1 发布于 2022 年 12 月 16 日，星期五

WiX v4 Release Candidate 1 修复了在 Preview 1 中报告的错误，但没有新增功能。


> Preview 1 发布于 2022 年 11 月 11 日，星期五

WiX v4 是 WiX Toolset 的一次重大版本更新，历经多年开发。[WiX v4 解决了 500 多个问题](https://github.com/wixtoolset/issues/issues?q=is%3Aissue+milestone%3Av4.0+is%3Aclosed)！

如果你对 WiX v3 已经很熟悉，[WiX v4 适用于 WiX v3 用户](./fourthree/index.md) 提供了有关 WiX v4 工作原理的详细信息。
