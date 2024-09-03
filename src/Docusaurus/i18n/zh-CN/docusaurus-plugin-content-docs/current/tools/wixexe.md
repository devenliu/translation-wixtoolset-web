---
sidebar_position: 30
---

# Wix.exe 命令行参考

[Wix.exe .NET 工具](../intro.md#nettool) 提供了一个令人安心的传统命令行界面。类似于其灵感来源 `dotnet` 命令行工具，Wix.exe 提供了多个命令，有些带有子命令，并且包含必需和可选的开关。

## Wix.exe 命令

Wix.exe 提供以下命令：

| Wix.exe 命令 | 描述 |
| ------------ | ---- |
| `wix build` | 构建 wixlib、包或捆绑包。 |
| `wix msi` | 用于操作 Windows Installer 包的专用操作。 |
| `wix burn` | 用于操作基于 Burn 的捆绑包的专用操作。 |
| `wix extension` | 管理 WiX 扩展缓存。 |
| `wix convert` | 将 v3 源代码转换为 v4 源代码。 |
| `wix format` | 确保源代码格式一致。 |

Wix.exe 对所有命令都有以下通用开关：

| 选项 | 描述 |
| ---- | ---- |
| `--help` 或 `-h` | 显示命令行帮助。 |
| `--version` | 显示正在使用的 WiX Toolset 版本。 |
| `--nologo` | 禁止显示徽标信息。 |


## `wix build` 命令 {#build}

构建包、捆绑包或库。

```sh
wix build [options] source_file.wxs [source_file.wxs ...]
```

| 选项 | 描述 |
| ---- | ---- |
| `-arch` _arch_ | 包或捆绑包的架构。有效值为：*x86*、*x64*、*arm64*。默认值：*x86*。等效的 MSBuild 属性：`InstallerPlatform` |
| `-bindfiles` 或 `-bf` | 将文件绑定到输出 .wixlib 中。如果未构建 .wixlib，则忽略此选项。 |
| `-bindpath` 或 `-b` _path_ | 搜索内容文件的绑定路径。 |
| `-bindpath:target` 或 `-bt` _path_ | 搜索目标包内容文件的绑定路径。仅在构建补丁时使用。 |
| `-bindpath:update` 或 `-bu` _path_ | 搜索更新包内容文件的绑定路径。仅在构建补丁时使用。 |
| `-bindvariable` 或 `-bv` _name_=_value_ | 设置绑定时变量。 |
| `-cabcache` 或 `-cc` _path_ | 设置一个文件夹，用于跨构建缓存柜文件。 |
| `-culture` _culture_ | 添加一种文化来过滤本地化文件。 |
| `-define` 或 `-d` _name_=_value_ | 设置预处理器变量。 |
| `-defaultcompressionlevel` 或 `-dcl` _level_ | 指定未通过 `MediaTemplate` 或 `Media` 指定时使用的压缩级别。有效值为：*none*、*low*、*medium*、*high*、*mszip*。默认值：*medium*。等效的 MSBuild 属性：`DefaultCompressionLevel` |
| `-ext` _id_ | [加载一个 WiX 扩展以在构建期间使用。](#extension) |
| `-includepath` 或 `-i` _path_ | 搜索包含文件的文件夹。 |
| `-intermediateFolder` _path_ | 可选的工作文件夹。如果未指定，则在 %TMP% 中创建一个文件夹。 |
| `-loc` _path_ | 构建中使用的本地化文件。默认情况下，.wxl 文件被识别为本地化文件。 |
| `-lib` _path_ | 构建中使用的库文件。默认情况下，.wixlib 文件被识别为库文件。 |
| `-src` _path_ | 构建中使用的源文件。默认情况下，.wxs 文件被识别为源代码。 |
| `-out` 或 `-o` _path_ | 输出的目标路径。当有多个源文件时是必需的；否则，默认输出路径为源文件的基本名称。 |
| `-outputtype` _type_ | 如果无法从输出中确定输出类型，请明确设置输出类型。 |
| `-pdb` _path_ | 可选的 .wixpdb 输出路径。默认情况下，会将 .wixpdb 写在输出路径旁边。 |
| `-pdbtype` _type_ | 用于禁用 .wixpdb 创建的开关。类型：full 或 none。 |


## `wix msi` 命令 {#msi}

`wix msi` 命令具有以下子命令：

| 子命令 | 描述 |
| ------ | ---- |
| `wix msi decompile` | 将 Windows Installer 数据库转换回源代码。 |
| `wix msi inscribe` | 使用柜文件签名信息更新 MSI 数据库。 |
| `wix msi transform` | 创建 MST 转换文件。 |
| `wix msi validate` | 使用标准或自定义 ICEs 验证 MSI 数据库。 |


### `wix msi decompile` 子命令 {#msidecompile}

将包或合并模块反编译成 WiX 创作文件或 WiX 数据文件。

```sh
wix msi decompile [options] {inputfile.msi|inputfile.msm}
```

| 选项 | 描述 |
| ---- | ---- |
| `-data` | 反编译成 WiX 数据文件而不是 WiX 编写文件。 |
| `-sct` | 不反编译自定义表。 |
| `-sdet` | 不删除空表。 |
| `-sras` | 不进行相对动作排序。 |
| `-sui` | 不反编译 UI 表。 |
| `-type` _type_ | 可选地指定输入文件类型：_msi_ 或 _msm_。如果未指定，类型将通过文件扩展名推断。 |
| `-intermediateFolder` _path_ | 可选的工作文件夹。如果未指定，将在 %TMP% 中创建一个文件夹。 |
| `-out` 或 `-o` _path_ | 可选的反编译输出文件路径。如果未指定，输出路径将与输入文件在同一目录下具有相同的基名称。 |
| `-x` _path_ | 如果指定，将嵌入的二进制文件和图标导出到指定文件夹。 |


### `wix msi inscribe` 子命令 {#msiinscribe}

使用分离的柜文件的签名更新 MSI 包。

```sh
wix msi inscribe [options] input.msi
```

| 选项 | 描述 |
| ---- | ---- |
| `-intermediateFolder` _path_ | 可选的工作文件夹。如果未指定，将在 %TMP% 中创建一个文件夹。 |
| `-out` 或 `-o` _path_ | 可选的签名更新包路径。如果未指定，`wix msi inscribe` 将在原地更新输入文件。 |


### `wix msi transform` 子命令 {#msitransform}

创建一个 Windows Installer 转换文件 (.mst)。

```sh
msi transform [options] target.msi [updated.msi] -out output.mst
```

| 选项 | 描述 |
| ---- | ---- |
| `-intermediateFolder` _path_ | 可选的工作文件夹。如果未指定，将在 %TMP% 中创建一个文件夹。 |
| `-out` 或 `-o` _path_ | 转换文件的必需路径。 |
| `-p` | 保留未更改的行。 |
| `-pedantic` | 显示严格消息。 |
| `-serr` _flags_ | 应用转换时抑制错误；请参阅下文中的错误标志。 |
| `-t` _type_ | 使用指定转换类型的默认验证标志；请参阅下文中的转换类型。 |
| `-val` _flags_ | 转换的验证标志；请参阅下文中的验证标志。 |
| `-x` _path_ | 如果指定，将嵌入的二进制文件和图标导出到指定的文件夹。 |
| `-xo` | 将转换输出为 WiX 输出，而不是 MST 文件。 |

| `-serr` 错误标志 | 描述 |
| ---------------- | ---- |
| `a` | 忽略添加已存在行时的错误。 |
| `b` | 忽略删除缺失行时的错误。 |
| `c` | 忽略添加已存在表时的错误。 |
| `d` | 忽略删除缺失表时的错误。 |
| `e` | 忽略修改缺失行时的错误。 |
| `f` | 忽略更改代码页时的错误。 |

| `-val` 验证标志 | 描述 |
| ---------------- | ---- |
| `g` | 升级代码必须匹配 |
| `l` | 语言必须匹配 |
| `r` | 产品 ID 必须匹配 |
| `s` | 仅检查主要版本 |
| `t` | 检查主要和次要版本 |
| `u` | 检查主要、次要和升级版本 |
| `v` | 升级版本 < 目标版本 |
| `w` | 升级版本 <= 目标版本 |
| `x` | 升级版本 = 目标版本 |
| `y` | 升级版本 > 目标版本 |
| `z` | 升级版本 >= 目标版本 |

| `-t` 转换类型 | 描述 |
| ------------- | ---- |
| `language` | 语言转换的默认标志：`abcdef` 和 `r` |
| `instance` | 实例转换的默认标志：`abcdef` 和 `ruy` |
| `patch` | 补丁转换的默认标志：`abcdef` 和 `grux` |


### `wix msi validate` 子命令 {#msivalidate}

验证 MSI 数据库，使用标准或自定义的内部一致性评估器（ICE）。

```sh
msi validate [options] {inputfile.msi|inputfile.msm}
```

| 选项 | 描述 |
| ---- | ---- |
| `-cub` _path_ | 可选的自定义验证 .CUBe 文件路径。 |
| `-ice` _id_ | 仅使用指定的 ICE 进行验证。可以多次提供。 |
| `-intermediateFolder` _path_ | 可选的工作文件夹。如果未指定，将在 %TMP% 中创建一个文件夹。 |
| `-pdb` _path_ | 可选的 .wixpdb 文件路径，用于源代码行信息。如果未提供，`wix msi validate` 会在输入文件旁边查找。 |
| `-sice` _id_ | 抑制 ICE 验证器。可以多次提供。 |


## `wix burn` 命令 {#burn}

`wix burn` 命令具有以下子命令：

| 子命令 | 描述 |
| ------ | ---- |
| `wix burn detach` | 从捆绑包中分离 Burn 引擎，以便进行签名。 |
| `wix burn extract` | 将捆绑包的内部提取到一个文件夹中。 |
| `wix burn reattach` | 将已签名的 Burn 引擎重新附加到捆绑包中。 |
| `wix burn remotepayload` | 生成远程有效负载的源代码。 |


### `wix burn detach` and `wix burn reattach` 子命令 {#burnsigning}

`wix burn detach` 和 `wix burn reattach` 子命令用于对捆绑包进行签名。有关详细信息，请参见 [签名捆绑包](./signing.md/#signing-bundles)。

```sh
wix burn detach [options] original.exe -engine engine.exe
```

| 选项 | 描述 |
| ---- | ---- |
| `-intermediateFolder` _path_ | 可选的工作文件夹。如果未指定，将在 %TMP% 中创建一个文件夹。 |
| `-engine` _path_ | 提取的捆绑包引擎路径。 |


```sh
wix burn reattach [options] original.exe -engine signed.exe -o final.exe
```

| 选项 | 描述 |
| ---- | ---- |
| `-intermediateFolder` _path_ | 可选的工作文件夹。如果未指定，将在 %TMP% 中创建一个文件夹。 |
| `-engine` _path_ | 必需的路径，指向使用 `wix burn detach` 提取并签名的 Burn 引擎。 |
| `-out` 或 `-o` _path_ | 必需的路径，指向重新附加了签名引擎的输出捆绑包，然后可以整体签名。 |


### `wix burn extract` 子命令 {#burnextract}

提取捆绑包的内容。

```sh
wix burn extract [options] bundle.exe -o outputfolder
```

| 选项 | 描述 |
| ---- | ---- |
| `-intermediateFolder` _路径_ | 可选的工作文件夹。如果未指定，将在 %TMP% 中创建一个文件夹。 |
| `-out` 或 `-o` _路径_ | 提取的捆绑包容器的目标目录。必须指定 `-out` 和 `-outba` 中至少一个。 |
| `-outba` 或 `-oba` _路径_ | 提取的引导程序应用程序容器的目标目录。必须指定 `-out` 和 `-outba` 中至少一个。 |


### `wix burn remotepayload` 子命令 {#burnremotepayload}

生成远程负载的源代码。

```sh
wix burn remotepayload [options] payloadfile [payloadfile ...]
```

| 选项 | 描述 |
| ------ | ----------- |
| `-basepath` or `-bp` _path_ | 设置用于生成相对负载的基础文件夹。 |
| `-bundlepayloadgeneration` _type_ | 设置包负载生成选项；可用的类型有：_none_、_externalwithoutdownloadurl_、_external_、_all_。 |
| `-downloadurl` or `-du` | 设置生成负载的 DownloadUrl 属性。 |
| `-intermediateFolder` _path_ | 可选的工作文件夹。如果未指定，将在 %TMP% 中创建一个文件夹。 |
| `-out` or `-o` _path_ | 输出源文件的目标路径。 |
| `-recurse` or `-r` | 递归生成目录中所有负载的源代码。 |
| `-packagetype` _type_ | 显式设置包类型；可用的类型有：_bundle_、_exe_、_msu_。 |
| `-usecertificate` | 使用证书验证签名的负载。此选项不推荐使用。 |


## `wix extension` 命令 {#extension}

管理扩展缓存。扩展的引用方式如下：

- `id`/`version`（使用指定的版本）
- `id`（使用最新可用版本）

:::note
如果省略 `version`，`wix extension` 命令可能会选择一个与您运行的 WiX 版本不兼容的扩展版本。为了避免这种情况，请使用特定版本。例如：`wix extension add WixToolset.Util.wixext/5.0.1`
:::

| 子命令 | 描述 |
| ------ | ---- |
| `wix extension add` | 将扩展添加到缓存中。 |
| `wix extension list` | 列出缓存中的扩展。 |
| `wix extension remove` | 从缓存中移除扩展。 |

```sh
wix extension add|remove|list [options] [extensionRef]
```

| 选项 | 描述 |
| ---- | ---- |
| `--global` 或 `-g` | 管理当前用户的 WiX 扩展缓存。如果未指定，则相对于当前目录管理扩展。 |


## `wix convert` 命令 {#convert}

将 v3 源代码转换为 v4 源代码。

```sh
wix convert [options] sourceFile [sourceFile ...]
```

_sourceFile_ 可以包含通配符，例如 `*.wxs`。

| 选项 | 描述 |
| ---- | ---- |
| `--custom-table` _type_ | 将自定义表格的创作转换为 MSI 包 (_msi_) 或捆绑包 (_bundle_) 使用。 |
| `--dry-run` 或 `-n` | 仅显示错误，不更新文件。 |
| `--recurse` 或 `-r` | 在当前目录及子目录中搜索匹配的文件。 |
| `-set1`_path_ | 主设置文件。`-set1` 与文件路径之间没有空格。 |
| `-set2`_path_ | 次设置文件（覆盖主设置）。`-set2` 与文件路径之间没有空格。 |
| `-indent:n` | 缩进倍数（覆盖默认的 4）。 |


## `wix format` 命令 {#format}

确保源代码格式的一致性。

```sh
wix format [options] sourceFile [sourceFile ...]
```

_sourceFile_ 可以包含通配符，例如 `*.wxs`。

| 选项 | 描述 |
| ---- | ---- |
| `--dry-run` 或 `-n` | 仅显示错误，不更新文件。 |
| `--recurse` 或 `-r` | 在当前目录及子目录中搜索匹配的文件。 |
| `-set1`_路径_ | 主设置文件。`-set1` 和文件路径之间不留空格。 |
| `-set2`_路径_ | 次要设置文件（覆盖主设置文件）。`-set2` 和文件路径之间不留空格。 |
| `-indent:n` | 缩进倍数（覆盖默认的 4）。 |

## 转换/格式化设置

| 测试 ID | 描述 |
| ------- | ---- |
| `InspectorTestTypeUnknown` | 仅内部使用：当字符串无法转换为 InspectorTestType 时显示。 |
| `XmlException` | 当发生 XML 加载异常时显示。 |
| `WhitespacePrecedingNodeWrong` | 当节点前的空白不正确时显示。 |
| `WhitespacePrecedingEndElementWrong` | 当结束元素前的空白不正确时显示。 |
| `DeclarationPresent` | 当源文件中存在 XML 声明时显示。 |
| `DeprecatedLocalizationVariablePrefixInTextValue` | 当内含文本包含已废弃的 $(loc.xxx) 引用时显示。 |
| `UnauthorizedAccessException` | 当无法访问文件时显示；通常发生在尝试保存固定文件时。 |
| `XmlnsMissing` | 当文档元素中缺少 xmlns 属性时显示。 |
| `XmlnsValueWrong` | 当文档元素上的 xmlns 属性值错误时显示。 |
| `DeprecatedLocalizationVariablePrefixInAttributeValue` | 当属性值包含已废弃的 $(loc.xxx) 引用时显示。 |
| `AssignAnonymousFileId` | 当未指定 Id 属性时，分配标识符给 File 元素。 |
| `BundleSignatureValidationObsolete` | SuppressSignatureValidation 属性已废弃，相应功能已移除。 |
| `WixCABinaryIdRenamed` | WixCA Binary/@Id 已重命名为 UtilCA。 |
| `QuietExecCustomActionsRenamed` | QtExec 自定义操作已重命名。 |
| `QtExecCmdTimeoutAmbiguous` | QtExecCmdTimeout 之前用于 CAQuietExec 和 CAQuietExec64。对于 WixQuietExec，请使用 WixQuietExecCmdTimeout；对于 WixQuietExec64，请使用 WixQuietExec64CmdTimeout。 |
| `AssignDirectoryNameFromShortName` | Directory/@ShortName 只能与 Directory/@Name 一起指定。 |
| `BootstrapperApplicationDataDeprecated` | BootstrapperApplicationData 属性已废弃，用 Unreal 替代 MSI。使用 BundleCustomData 元素用于 Bundles。 |
| `AssignPermissionExInheritable` | Inheritable 是新的，现在默认值为 'yes'，这对除 CreateFolder 子项外的所有项行为有所更改。 |
| `ColumnCategoryCamelCase` | Column 元素的 Category 属性采用驼峰式命名。 |
| `ColumnModularizeCamelCase` | Column 元素的 Modularize 属性采用驼峰式命名。 |
| `InnerTextDeprecated` | 内含文本值应移至属性。 |
| `AutoGuidUnnecessary` | 显式 auto-GUID 不必要。 |
| `FeatureAbsentAttributeReplaced` | Feature Absent 属性已重命名为 AllowAbsent。 |
| `FeatureAllowAdvertiseValueDeprecated` | Feature AllowAdvertise 属性值已废弃。 |
| `PublishConditionOneUnnecessary` | Publish 元素上的 Condition='1' 属性不必要。 |
| `AssignBootstrapperApplicationDpiAwareness` | DpiAwareness 是新的，默认值为 'perMonitorV2'，这是行为上的更改。 |
| `AssignVariableTypeFormatted` | 字符串变量类型以前被视为格式化。 |
| `CustomActionKeysAreNowRefs` | CustomAction 属性已重命名，从 BinaryKey 和 FileKey 改为 BinaryRef 和 FileRef。 |
| `ProductAndPackageRenamed` | Product 和 Package 元素已重命名和重组。 |
| `ModuleAndPackageRenamed` | Module 和 Package 元素已重命名和重组。 |
| `DefaultMediaTemplate` | 默认情况下提供了没有设置属性的 MediaTemplate。 |
| `UtilRegistryValueSearchBehaviorChange` | util:RegistrySearch 在值缺失时发生了破坏性更改。 |
| `DisplayInternalUiNotConvertable` | DisplayInternalUI 无法转换。 |
| `InstallerVersionBehaviorChange` | InstallerVersion 在省略时发生了破坏性更改。 |
| `VerbTargetNotConvertable` | Verb/@Target 无法转换。 |
| `BootstrapperApplicationDll` | 启动程序应用程序 dll 现在在其自己的元素中指定。 |
| `BootstrapperApplicationDllRequired` | 新的启动程序应用程序 dll 元素是必需的。 |
| `BalUseUILanguagesDeprecated` | bal:UseUILanguages 已废弃，'true' 现在是标准行为。 |
| `BalBootstrapperApplicationRefToElement` | 内置 BAs 的自定义元素现在是必需的。 |
| `RenameExePackageCommandToArguments` | ExePackage 元素的 "XxxCommand" 属性已重命名为 "XxxArguments"。 |
| `Win64AttributeRenamed` | Win64 属性已重命名。请改用 Bitness 属性。 |
| `Win64AttributeRenameCannotBeAutomatic` | 破坏性更改：Win64 属性值 '{0}' 不能自动转换为新的 Bitness 属性。 |
| `TagElementRenamed` | Tag 元素已重命名。请使用元素 'SoftwareTag' 名称。 |
| `IntegratedDependencyNamespace` | Dependency 命名空间已并入 WiX v4 命名空间。 |
| `RemoveUnusedNamespaces` | 移除未使用的命名空间。 |
| `RemotePayloadRenamed` | Remote 元素已重命名。请改用 "XxxPackagePayload" 元素。 |
| `NameAttributeMovedToRemotePayload` | 使用远程有效负载时，XxxPackage/@Name 属性必须在子 XxxPackagePayload 元素上指定。 |
| `CompressedAttributeUnnecessaryForRemotePayload` | 使用远程有效负载时，不应指定 XxxPackage/@Compressed 属性。 |
| `DownloadUrlAttributeMovedToRemotePayload` | 使用远程有效负载时，XxxPackage/@DownloadUrl 属性必须在子 XxxPackagePayload 元素上指定。 |
| `BurnHashAlgorithmChanged` | Bundles 使用的哈希算法已从 SHA1 更改为 SHA512。 |
| `CustomTableNotAlwaysConvertable` | CustomTable 元素无法始终转换。 |
| `CustomTableRef` | 不包含表定义的 CustomTable 元素现在是 CustomTableRef。 |
| `RegistryKeyActionObsolete` | RegistryKey 元素的 Action 属性已废弃。 |
| `TagRefElementRenamed` | TagRef 元素已重命名。请使用元素 'SoftwareTagRef' 名称。 |
| `SoftwareTagLicensedObsolete` | SoftwareTag 元素的 Licensed 属性已废弃。 |
| `SoftwareTagTypeObsolete` | SoftwareTag 元素的 Type 属性已废弃。 |
| `TargetDirDeprecated` | TARGETDIR 目录不应再显式定义。 |
| `DefiningStandardDirectoryDeprecated` | 不应再使用 Directory 元素定义标准目录。 |
| `ReferencesReplaced` | Naked UI、自定义操作和属性引用已替换为元素。 |
| `BundlePackageCacheAttributeValueObsolete` | 缓存属性值已更新。 |
| `MsuPackageKBObsolete` | MsuPackage 元素包含废弃的 '{0}' 属性。Windows 不再支持静默删除 MSUs，因此该属性不必要。该属性将被移除。 |
| `MsuPackagePermanentObsolete` | MsuPackage 元素包含废弃的 '{0}' 属性。由于 Windows 不再支持静默删除 MSUs，MSU 包现在始终是永久性的。该属性将被移除。 |
| `MoveNamespacesToRoot` | 命名空间应在根元素上定义。'{0}' 命名空间已移到根元素。 |
| `CustomActionIdsIncludePlatformSuffix` | 自定义操作 ID 在 WiX v4 扩展中已更改。由于 WiX v4 有特定平台的自定义操作，平台作为后缀应用：_X86, _X64, _A64 (Arm64)。在手动重新调度自定义操作时，必须使用新的自定义操作 ID，附加平台后缀。 |
| `StandardDirectoryRefDeprecated` | {0} 目录不应再显式引用。移除具有 Id 属性 '{0}' 的 DirectoryRef 元素。 |
| `EmptyStandardDirectoryRefNotConvertable` | 直接引用 '{0}' 目录不再受支持。DirectoryRef 将不会被移除，但可能需要引用更具体的目录。 |
| `WixMbaPrereqLicenseUrlDeprecated` | 魔法 WixVariable 'WixMbaPrereqLicenseUrl' 已被移除。请改为将 bal:PrereqLicenseUrl="_url_" 添加到先决条件包中。 |
| `WixMbaPrereqPackageIdDeprecated` | 魔法 WixVariable 'WixMbaPrereqPackageId' 已被移除。请改为将 bal:PrereqPackage="yes" 添加到目标包中。 |
| `TargetDirRefRemoved` | 对 TARGETDIR 目录的引用已被移除。这可能导致定义 TARGETDIR 的 Fragment 未包含在最终输出中。如果发生这种情况，请在 Fragment 中引用不同的元素，以替代旧的 TARGETDIR 引用。 |
