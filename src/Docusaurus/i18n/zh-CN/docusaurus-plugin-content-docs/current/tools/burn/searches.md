---
sidebar_position: 2
---

# Burn 系统搜索

搜索用于检测目标计算机是否符合某些条件。搜索的结果存储在一个变量中。变量随后用于构建条件。要编写 Burn 搜索，您需要引用 WixToolset.Util.wixext WiX 扩展。

以下是可用的搜索：

- [ComponentSearch](../../schema/util/componentsearch.md)
- [DirectorySearch](../../schema/util/directorysearch.md)
- [FileSearch](../../schema/util/filesearch.md)
- [ProductSearch](../../schema/util/productsearch.md)
- [RegistrySearch](../../schema/util/registrysearch.md)
- [WindowsFeatureSearch](../../schema/util/windowsfeaturesearch.md)

一个搜索可以依赖于另一个搜索的结果。要安排搜索的顺序，请使用 `After` 属性，将一个搜索安排在另一个搜索之后执行，当第一个搜索的变量具有该搜索的结果值时。

以下是一些示例：

```xml
<util:RegistrySearch
    Id="RegistrySearchId64"
    Variable="RegistrySearchVariable64"
    Root="HKLM"
    Key="SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full"
    Value="Release"
    Result="value"
    Bitness="always64" />

<util:ProductSearch
    Id="ProductSearchId"
    Variable="ProductSearchVariable"
    UpgradeCode="{8C74C610-AB2A-4BFB-9FC6-8683A9100424}"
    Result="version" />

<util:DirectorySearch
    Id="DirectorySearchId"
    Variable="DirectorySearchVariable"
    Path="[WindowsFolder]System32"
    DisableFileRedirection="yes" />

<util:FileSearch
    Id="FileSearchId"
    Variable="FileSearchVariable"
    After="DirectorySearchId"
    Path="[DirectorySearchVariable]\mscoree.dll"
    Result="exists" />

<util:WindowsFeatureSearch
    Id="DetectSHA2SupportId"
    Variable="IsSHA2Supported"
    Feature="sha2CodeSigning" />
```
