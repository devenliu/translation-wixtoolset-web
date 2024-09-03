---
sidebar_position: 0
---

# 开始使用 WiX

有三种方式可以使用 WiX：

- [命令行 .NET 工具](#nettool)
- [MSBuild 命令行和 CI/CD 构建系统](#msbuild)
- [Visual Studio](#vs)


## 命令行 .NET 工具 {#nettool}

WiX 作为 [.NET 工具](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools) 提供，方便你在命令行中使用。

:::note
`wix.exe` 工具需要 .NET SDK 6 或更高版本。
:::

Wix.exe 支持执行特定操作的命令。例如，`build` 命令允许你构建 MSI 包、捆绑包和其他包类型。

安装 Wix.exe .NET 工具：

```sh
dotnet tool install --global wix
```

验证 Wix.exe 是否成功安装：

```sh
wix --version
```

### 更新 WiX .NET 工具

要更新你安装的 [.NET 工具](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools) 中的 WiX：

```sh
dotnet tool update --global wix
```

第一次安装 WiX 作为 .NET 工具：

```sh
dotnet tool install --global wix
```

验证 Wix.exe 是否成功安装或更新：

```sh
wix --version
```

### 参阅
- [Wix.exe 命令行参考](./tools/wixexe.md)


## MSBuild 命令行和 CI/CD 构建系统 {#msbuild}

WiX 可用作 MSBuild SDK，使用 .NET SDK 中的 `dotnet build` 或 Visual Studio 中基于 .NET Framework 的 `MSBuild` 从命令行进行构建。SDK 样式的项目具有智能默认值，可简化 .wixproj 项目创作。例如，这是一个最小的 .wixproj，它从项目目录中的 .wxs 源文件构建 MSI：

```xml
<Project Sdk="WixToolset.Sdk/5.0.1">
</Project>
```

### 更新 MSBuild 项目

要更新您从以前的 WiX 版本迁移来的 .wixproj MSBuild 项目，请更新 `Project` 元素的 `Sdk` 属性：

```xml
<Project Sdk="WixToolset.Sdk/5.0.1">
```

对于 WiX 扩展的 `PackageReference`，更新其 `Version` 属性。例如：

```xml
<PackageReference Include="WixToolset.Util.wixext" Version="5.*" />
<PackageReference Include="WixToolset.Netfx.wixext" Version="5.*" />
```

要清理以前版本的 WiX 的 NuGet 工件，我们建议您删除项目中的 `bin` 和 `obj` 目录。如果您使用 .NET Framework MSBuild，请执行显式的 `MSBuild -Restore` 来恢复到最新版本。（使用 `dotnet build` 会为你隐式执行此操作。）

### 参阅
- [MSBuild 参考](./tools/msbuild.md)


## Visual Studio {#vs}

[FireGiant](https://www.firegiant.com/) 发布了 [HeatWave 社区版][heatwave] 以支持在 Visual Studio 中使用 WiX SDK 样式的 MSBuild 项目。HeatWave 支持：

- WiX v3 项目的转换和创作
- WiX SDK 样式项目的构建
- 项目和项模板
- 控制项目构建方式的属性页面

[HeatWave 社区版可免费使用。][heatwave]


[heatwave]: https://www.firegiant.com/wix/heatwave/


## 使用开发版 {#devbuilds}

包含所有最新 bug 修复的 WiX 开发版可在 GitHub 上的 NuGet 包源中获得。要将该源添加为软件包源，请执行以下操作：

```sh
dotnet nuget add source https://nuget.pkg.github.com/wixtoolset/index.json -n wixtoolset -u <username> -p <access-token>
```

您需要使用这些包的确切版本。例如：

```xml
<Project Sdk="WixToolset.Sdk/6.0.0-rc.1-build.42">
</Project>
```

有关更详细的说明，请查看 [此视频](https://youtu.be/2iIjq6zt6z0).
