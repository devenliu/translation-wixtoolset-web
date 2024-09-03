---
sidebar_position: 1
---

# Burn 内置变量

Burn 引擎提供了一组常用的变量，以便您无需定义自己的变量即可使用它们。以下是内置变量名称的列表：

| 变量 | 描述 |
| ---- | ---- |
| AdminToolsFolder | 知名文件夹 CSIDL_ADMINTOOLS。 |
| AppDataFolder | 知名文件夹 CSIDL_APPDATA。 |
| CommonAppDataFolder | 知名文件夹 CSIDL_COMMON_APPDATA。 |
| CommonFilesFolder | 知名文件夹 CSIDL_PROGRAM_FILES_COMMONX86。 |
| CommonFiles64Folder | 知名文件夹 CSIDL_PROGRAM_FILES_COMMON。 |
| CommonFiles6432Folder | 知名文件夹 CSIDL_PROGRAM_FILES_COMMON（在 64 位 Windows 上）和 CSIDL_PROGRAM_FILES_COMMONX86（在 32 位 Windows 上）。 |
| CompatibilityMode | 非零值表示操作系统以兼容模式启动了引导程序。 |
| ComputerName | 计算机名称，来自 `GetComputerName` 函数。 |
| Date | 当前日期，使用当前用户区域设置的短日期格式。 |
| DesktopFolder | 知名文件夹 CSIDL_DESKTOP。 |
| FavoritesFolder | 知名文件夹 CSIDL_FAVORITES。 |
| FontsFolder | 知名文件夹 CSIDL_FONTS。 |
| InstallerName | 安装程序引擎的名称（“WiX Burn”）。 |
| InstallerVersion | 安装程序引擎的版本。 |
| InstallerInformationalVersion | 安装程序引擎的说明版本（含哈希值）。 |
| LocalAppDataFolder | 知名文件夹 CSIDL_LOCAL_APPDATA。 |
| LogonUser | 当前用户名。 |
| MyPicturesFolder | 知名文件夹 CSIDL_MYPICTURES。 |
| NativeMachine | 代表计算机本地架构的 [Image File Machine 值](https://docs.microsoft.com/en-us/windows/win32/sysinfo/image-file-machine-constants)。仅在 Windows 10 版本 1511（TH2）及更高版本上设置。 |
| NTProductType | 来自操作系统版本信息的数字产品类型。 |
| NTSuiteBackOffice | 非零值表示操作系统版本套件为 Back Office。 |
| NTSuiteDataCenter | 非零值表示操作系统版本套件为 Datacenter。 |
| NTSuiteEnterprise | 非零值表示操作系统版本套件为 Enterprise。 |
| NTSuitePersonal | 非零值表示操作系统版本套件为 Personal。 |
| NTSuiteSmallBusiness | 非零值表示操作系统版本套件为 Small Business。 |
| NTSuiteSmallBusinessRestricted | 非零值表示操作系统版本套件为 Restricted Small Business。 |
| NTSuiteWebServer | 非零值表示操作系统版本套件为 Web Server。 |
| PersonalFolder | 知名文件夹 CSIDL_PERSONAL。 |
| ProcessorArchitecture | 本地 SYSTEM_INFO.wProcessorArchitecture。 |
| Privileged | 非零值表示进程可以以管理员权限运行（当 UAC 可用时）或正在以管理员身份运行。 |
| ProgramFilesFolder | 知名文件夹 CSIDL_PROGRAM_FILESX86。 |
| ProgramFiles64Folder | 知名文件夹 CSIDL_PROGRAM_FILES。 |
| ProgramFiles6432Folder | 知名文件夹 CSIDL_PROGRAM_FILES（在 64 位 Windows 上）和 CSIDL_PROGRAM_FILESX86（在 32 位 Windows 上）。 |
| ProgramMenuFolder | 知名文件夹 CSIDL_PROGRAMS。 |
| RebootPending | 非零值表示系统需要重启。注意，此值将反映系统在首次请求变量时的重启状态。 |
| SendToFolder | 知名文件夹 CSIDL_SENDTO。 |
| ServicePackLevel | 表示已安装的操作系统服务包的数字值。 |
| StartMenuFolder | 知名文件夹 CSIDL_STARTMENU。 |
| StartupFolder | 知名文件夹 CSIDL_STARTUP。 |
| SystemFolder | 知名文件夹 CSIDL_SYSTEMX86（在 64 位 Windows 上）和 CSIDL_SYSTEM（在 32 位 Windows 上）。 |
| System64Folder | 知名文件夹 CSIDL_SYSTEM（在 64 位 Windows 上）和未定义（在 32 位 Windows 上）。 |
| SystemLanguageID | 系统区域设置的语言 ID。 |
| TempFolder | 知名文件夹用于临时目录。 |
| TemplateFolder | 知名文件夹 CSIDL_TEMPLATES。 |
| TerminalServer | 非零值表示系统以远程桌面服务的应用程序服务器模式运行。 |
| UserUILanguageID | 当前用户区域设置的选择语言 ID。 |
| UserLanguageID | 当前用户区域设置的格式语言 ID。 |
| VersionMsi | 代表 Windows Installer 引擎版本的版本值。 |
| VersionNT | 代表操作系统版本的版本值。结果是一个版本变量（v#.#.#.#），不同于 Windows Installer 属性 `VersionNT` 的整数。例如，要在 Bundle 条件中使用此变量，请使用：`VersionNT > v6.1`。 |
| VersionNT64 | 如果为 64 位，则表示操作系统版本的版本值。在 32 位操作系统上未定义。结果是一个版本变量（v#.#.#.#），不同于 Windows Installer 属性 `VersionNT64` 的整数。例如，要在 Bundle 条件中尝试使用此变量，请使用：`VersionNT64 > v6.1`。 |
| WindowsBuildNumber | 操作系统的构建号。 |
| WindowsFolder | 知名文件夹 CSIDL_WINDOWS。 |
| WindowsVolume | 知名文件夹用于 Windows 卷。 |
| WixBundleAction | 从命令行获取的 BOOTSTRAPPER_ACTION 的数值，并在调用 IBootstrapperEngine::Plan 期间更新。 |
| WixBundleDirectoryLayout | 提供给 `-layout` 开关的文件夹（默认是包含捆绑程序可执行文件的目录）。此变量也可以由引导程序应用程序设置，以修改文件布局位置。 |
| WixBundleElevated | 非零值表示捆绑程序以管理员权限启动，并在捆绑程序被提升时设置为 `1`。例如，使用此变量在引导程序应用程序 UI 中显示或隐藏提升徽章。 |
| WixBundleExecutePackageCacheFolder | 当前正在执行的包的缓存文件夹的绝对路径。此变量仅在包执行时可用。 |
| WixBundleForcedRestartPackage | 导致强制重启的包的 ID。在下次调用 Apply 时重置此值。 |
| WixBundleInstalled | 非零值表示捆绑程序已安装。此值仅在引擎初始化时设置。 |
| WixBundleLastUsedSource | 最后一次成功源解析的路径，用于容器或有效负载。 |
| WixBundleName | 捆绑程序的名称（来自 `Bundle/@Name`）。此变量也可以由引导程序应用程序设置，以在运行时修改捆绑程序名称。 |
| WixBundleManufacturer | 捆绑程序的制造商（来自 `Bundle/@Manufacturer`）。 |
| WixBundleOriginalSource | 捆绑程序最初运行的源路径。 |
| WixBundleOriginalSourceFolder | 捆绑程序最初运行的文件夹。 |
| WixBundleSourceProcessPath | 捆绑程序最初执行的源路径。仅在捆绑程序在清理环境中执行时设置（在 WiX v5 中已删除）。 |
| WixBundleSourceProcessFolder | 捆绑程序最初执行的源文件夹。仅在捆绑程序在清理环境中执行时设置（在 WiX v5 中已删除）。 |
| WixBundleProviderKey | 捆绑程序依赖项提供者密钥。 |
| WixBundleTag | 此捆绑程序的开发人员定义标签字符串（来自 `Bundle/@Tag`）。 |
| WixBundleUILevel | 用户界面的级别（BOOTSTRAPPER_DISPLAY 枚举）。 |
| WixBundleVersion | 此捆绑程序的版本（来自 `Bundle/@Version`）。 |
| WixCanRestart | 非零值表示运行捆绑程序的用户具有在捆绑程序提示重启时重启计算机所需的权限。 |
