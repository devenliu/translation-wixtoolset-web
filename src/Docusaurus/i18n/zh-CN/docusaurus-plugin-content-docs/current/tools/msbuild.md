---
sidebar_position: 20
---

# MSBuild

WiX v4 作为 MSBuild SDK 可用。SDK 样式的项目具有智能默认设置，使 .wixproj 项目编写变得简单。例如，以下是一个最小的 .wixproj，它从项目目录中的 .wxs 源文件构建一个 MSI：

```xml
<Project Sdk="WixToolset.Sdk/5.0.1">
</Project>
```

:::tip
SDK 样式的项目更容易编写，但与“旧”项目的工作方式有所不同。例如，你可能需要使用显式的 SDK 导入来覆盖 SDK .props 和 .targets 文件的正常导入。有关更多信息，请参见 [MSBuild 文档](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-project-sdk#use-the-import-element-anywhere-in-your-project)。
:::

你还可以使用 FireGiant 的 [HeatWave 社区版](https://www.firegiant.com/wix/heatwave/) 在 Visual Studio 中创建和编辑 SDK 样式的 MSBuild 项目。

:::info
有关在使用 MSBuild 时对包和捆绑包进行签名的信息，请参见 [签名包和捆绑包](./signing.md)。
:::

## 属性

你可以在 .wixproj 中设置以下属性来控制构建：

| 属性 | 描述 |
| ---- | ---- |
| AdditionalCub | 用于 MSI 验证的 .cub 文件的分号分隔列表。默认值：.msi 包使用 darice.cub；.msm 包使用 mergemod.cub |
| BindFiles | 如果为 **true**，则将引用的文件绑定到输出文件中。仅在构建 .wixlib WiX 库时有效。默认值：**false** |
| CabinetCreationThreadCount | 指定在构建多个内阁时使用的同时线程数。默认值：系统中的逻辑处理器数量 |
| CompilerAdditionalOptions | 指定在构建过程中使用的任意 [Wix.exe 命令行参数](./wixexe.md) 的字符串。默认值：无 |
| DebugType | 指定 .wixpdb 输出：*full* 表示完整符号信息，*none* 表示抑制 .wixpdb。默认值：*full* |
| DefaultCompressionLevel | 指定未通过 `MediaTemplate` 或 `Media` 指定时使用的压缩级别。有效值：*none*、*low*、*medium*、*high*、*mszip*。默认值：*medium*。默认 Wix.exe 开关：`-defaultcompressionlevel` |
| DefineConstants | 指定预处理变量值的分号分隔 **name**=**value** 字符串对列表。默认值：无 |
| Ices | MSI 验证期间要运行的 ICE 验证名称的分号分隔列表。默认值：所有可用的 ICE |
| IncludeSearchPaths | 用于定位 `<?include?>` 文件的路径的分号分隔列表。默认值：当前目录 |
| InstallerPlatform | 包或捆绑包的体系结构。有效值：*x86*、*x64*、*arm64*。默认值：`$(Platform)`。默认 Wix.exe 开关：`-arch` |
| IntermediateOutputPath | 用于中间输出的路径。默认值：obj/*platform*/*configuration* |
| LinkerAdditionalOptions | 指定在构建过程中使用的任意 [Wix.exe 命令行参数](./wixexe.md) 的字符串。默认值：无 |
| OutputType | 指定构建的包类型。有效值：*Package*、*Module*、*Patch*、*PatchCreation*、*Library*、*Bundle*、*IntermediatePostLink*。默认值：*Package* |
| Pedantic | 如果为 **true**，则启用苛刻的警告消息。默认值：**false** |
| SuppressAllWarnings | 如果为 **true**，则关闭所有警告消息。默认值：**false** |
| SuppressIces | 不要在 MSI 验证期间运行的 ICE 验证名称的分号分隔列表。默认值：无 |
| SuppressSpecificWarnings | 关闭的警告消息编号的分号分隔列表。默认值：无 |
| SuppressValidation | 如果为 **true**，则关闭 MSI 验证。默认值：**false** |
| TreatSpecificWarningsAsErrors | 作为错误处理的警告消息编号的分号分隔列表。默认值：无 |
| TreatWarningsAsErrors | 如果为 **true**，则将所有警告消息视为错误。默认值：**false** |
| ValidationAdditionalOptions | 指定在验证期间使用的任意 [Wix.exe 命令行参数](./wixexe.md#msi) 的字符串。默认值：无 |
| VerboseOutput | 如果为 **true**，则启用详细消息。默认值：**false** |


## 项

| 项 | 描述 |
| ------ | ---- |
| BindPath | 用于定位有效负载文件的绑定路径。要创建命名的绑定路径，请使用 `BindName` 元数据指定绑定路径的名称。 |
| Compile | 要编译的文件。默认情况下，WiX SDK 自动包括所有 WiX 编写，使用通配符 `**/*.wxs`。要控制默认项，请参见 [项目 SDK 文档](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/msbuild-props#default-item-inclusion-properties)。 |
| EmbeddedResource | 用于构建特定于区域的包的本地化文件。默认情况下，WiX SDK 自动包括所有本地化文件，使用通配符 `**/*.wxl`。要控制默认项，请参见 [项目 SDK 文档](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/msbuild-props#default-item-inclusion-properties)。 |
| WixLibrary | 包含包引用的编写的 WiX 库 (.wixlib 文件) 的路径。 |

## 项目引用

`ProjectReference` 项目引用是 MSBuild 机制，用于确保依赖项目在依赖于它的项目之前构建。例如，一个 .wixproj 项目依赖于一个 .csproj 项目，以确保在构建 .wixproj 之前先构建要安装的应用程序。WiX MSBuild 目标扩展了 `ProjectReference`，以创建绑定路径和包含有关依赖项目的有用信息的预处理器变量。

:::note
WiX MSBuild 目标从引用的项目创建绑定路径和预处理器变量的标识符。无效字符将被替换为下划线。标识符以字母或下划线开头，可以跟随字母数字字符、下划线和/或句点。例如，`My Exe.csproj` 中的空格将被替换，`My_Exe` 将用作绑定路径和预处理器变量名称。
:::

### 绑定路径

WiX MSBuild 目标创建指向每个引用项目输出目录的绑定路径。这意味着你可以仅使用文件名指定来自 .csproj 项目的 .exe。例如：

```xml
<File Source="ConsoleApp42.exe" />
```


### 预处理器变量

WiX MSBuild 目标为每个引用的项目创建了多个预处理器变量。

| 变量 | 示例 | 示例值 |
| ---- | ---- | ---- |
| _ProjectName_.Configuration | $(MyProject.Configuration) | Release |
| _ProjectName_.FullConfiguration | $(MyProject.FullConfiguration) | Release\|ARM64 |
| _ProjectName_.Platform | $(MyProject.Platform) | ARM64 |
| _ProjectName_.ProjectDir | $(MyProject.ProjectDir) | C:\source\repos\ConsoleApp42\ |
| _ProjectName_.ProjectExt | $(MyProject.ProjectExt) | .csproj |
| _ProjectName_.ProjectFileName | $(MyProject.ProjectFileName) | MyProject.csproj |
| _ProjectName_.ProjectName | $(MyProject.ProjectName) | MyProject |
| _ProjectName_.ProjectPath | $(MyProject.ProjectPath) | C:\source\repos\ConsoleApp42\MyApp.csproj |
| _ProjectName_.TargetDir | $(MyProject.TargetDir) | C:\source\repos\ConsoleApp42\bin\Release\ |
| _ProjectName_.TargetExt | $(MyProject.TargetExt) | .exe |
| _ProjectName_.TargetFileName | $(MyProject.TargetFileName) | MyProject.exe |
| _ProjectName_.TargetName | $(MyProject.TargetName) | MyProject |
| _ProjectName_.TargetPath | $(MyProject.TargetPath) | C:\source\repos\ConsoleApp42\bin\Release\MyProject.exe |
| _ProjectName_.Culture.TargetPath | $(MyProject.en-US.TargetPath) | C:\source\repos\ConsoleApp42\bin\Release\en-US\MyProject.msi |

如其名称所示，下列预处理器变量仅在构建 `.sln` 文件时可用。
在 Visual Studio 内进行构建时始终使用 `.sln` 文件，因此在使用命令行构建项目文件时，这些预处理器变量不可用可能会让人感到意外。

| 变量 | 示例 | 示例值 |
| ---- | ---- | ---- |
| SolutionDir | $(SolutionDir) | C:\source\repos\MySolution\ |
| SolutionExt | $(SolutionExt) | .sln |
| SolutionFileName | $(SolutionFileName) | MySolution.sln |
| SolutionName | $(SolutionName) | MySolution |
| SolutionPath | $(SolutionPath) | C:\source\repos\MySolution\MySolution.sln |


## 集中管理 MSBuild 属性和目标

有时候你需要在多个 MSBuild 项目中添加或修改相同的属性，如制造商名称、版权、产品名称等。与其逐个编辑每个项目，不如在名为 Directory.Build.props 的文件中集中管理这些属性。

:::info
Directory.Build.props 是 Microsoft.Common.props 的一个功能，WiX v4 MSBuild 目标使用了该功能。Directory.Build.targets 和 Microsoft.Common.targets 也是如此。[你可以在这里阅读更多关于此支持的信息。](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory)
:::

要使用 Directory.Build.props，将其添加到项目的根目录下——MSBuild 将在父目录中找到该文件——并给它一个属性组。例如：

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project>
  <PropertyGroup>
    <MyProductNameProperty>My Fancy Productname</MyProductNameProperty>
  </PropertyGroup>
</Project>
```

然后，你可以在其他属性中引用 `MyProductNameProperty`，例如：

```xml
<PropertyGroup>
  <Product>$(MyProductNameProperty)</Product>
</PropertyGroup>
```

要在 WiX 创作中将属性值作为预处理变量使用，请将它们添加到 `DefineConstants` 属性中。例如：

```xml
<Project Sdk="WixToolset.Sdk/5.0.1">
  <PropertyGroup Label="Globals">
     <DefineConstants>MyProductNameProperty=$(MyProductNameProperty);</DefineConstants>
  </PropertyGroup>
</Project>
```

然后，在你的 WiX 创作中，可以使用 `$()` 预处理语法来引用通过 MSBuild 属性转化的 WiX 预处理变量：

```xml
<Package Name="$(MyProductNameProperty)" ...
```

现在，你可以在 `Directory.Build.props` 文件中修改属性值，解决方案中的所有项目（包括 WiX 项目）中的属性将会更新。
