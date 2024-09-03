# WiX v5 中的独立进程引导程序

在 WiX v5 中，Burn 以独立进程的方式启动引导程序，而不是将它们作为 DLL 加载到 Burn 进程中。如果使用 WiX 标准引导程序或 WiX 内部 UI 引导程序，这一转变是被抽象化的，不应引入任何破坏性变更或所需的创作更改。

本文档的其余部分详细说明了将自定义引导程序更新到 WiX v5 所需的更改。

这一变化的动机可以在 [#7916](https://github.com/wixtoolset/issues/issues/7916) 中找到。这显然是一个重大破坏性变更，因此也借此机会改进了几个 .nupkg 包的名称，如 [#8020](https://github.com/wixtoolset/issues/issues/8020) 中所述。

:::tip
[WiX GitHub 仓库](https://github.com/wixtoolset/wix) 包含了使用新模型的引导程序代码，例如 [WixStandardBootstrapperApplication](https://github.com/wixtoolset/wix/blob/HEAD/src/ext/Bal/stdbas/WixStandardBootstrapperApplication.cpp)（C++）和 [WixBA](https://github.com/wixtoolset/wix/tree/HEAD/src/test/burn/WixToolset.WixBA)（C#）。
:::

首先，自定义引导程序项目需要从 DLL 更改为 EXE。

```diff
exampleba.vcxproj
-    <ConfigurationType>DynamicLibrary</ConfigurationType>
+    <ConfigurationType>Application</ConfigurationType>
```

或者

```diff
exampleba.csproj
+   <OutputType>WinExe</OutputType>
```

并引用 `WixToolset.BootstrapperApplicationApi` NuGet 包（这个包替代了 `WixToolset.BalUtil` 和 `WixToolset.Mba.Core` 两个包）。

作为可执行文件，引导程序需要一个 `main` 函数。引导程序的 `main` 函数应该尽可能简洁，以便尽快连接到父 Burn 进程。例如，

```cpp
// exampleba.cpp
EXTERN_C int WINAPI wWinMain(
    __in HINSTANCE hInstance,
    __in_opt HINSTANCE /* hPrevInstance */,
    __in_z_opt LPWSTR /*lpCmdLine*/,
    __in int /*nCmdShow*/
    )
{
    HRESULT hr = S_OK;
    IBootstrapperApplication* pApplication = new ExampleBootstrapperApplication();

    hr = BootstrapperApplicationRun(pApplication);
    ExitOnFailure(hr, "引导程序运行失败。");

LExit:
    ReleaseObject(pApplication);

    return 0;
}
```

或者

```cs
// example.cs
using WixToolset.BootstrapperApplicationApi;

internal class Program
{
    private static int Main()
    {
        var application = new ExampleBootstrapperApplication();

        ManagedBootstrapperApplication.Run(application);

        return 0;
    }
}
```

注意，引导程序引擎和命令对象不再传递给引导程序的创建。这些值在应用程序连接到父 Burn 进程（在 `BootstrapperApplicationRun` 或 `ManagedBootstrapperApplication.Run` 中）之前不可用。因此，新增了一个 `OnCreate` 引导程序回调，该回调提供了引导程序引擎和命令对象。为了保持 API 的平衡，还添加了 `OnDestroy` 回调。

此时，引导程序 API 的兼容性较好，只需注意以下几个额外的细节：

* 管理型引导程序不再支持更改“异步运行”。引导程序现在总是将其 UI 运行在一个单独的线程中。
* `BootstrapperApplicationFactory` 概念不再使用。请移除所有与其相关的类。按照上面所示，在 `main` 函数中创建引导程序。
* `BalBaseBootstrapperApplication.h` 已重命名为 `BootstrapperApplicationBase.h`。
* `CBalBaseBootstrapperApplication` 已弃用，请改用 `CBootstrapperApplicationBase`。

为了利用这一破坏性变更，我们也趁机改进了许多与自定义引导程序相关的 NuGet 包名称：

* `WixToolset.BalUtil` - 重命名为 `WixToolset.BootstrapperApplicationApi`，提供与 Burn 通信的原生头文件和库。此外，分出了 `WixToolset.WixStandardBootstrapperApplicationFunctionApi` 用于 WixStdBA BAFunctions API。
* `WixToolset.Mba.Core` - 将托管库合并到 `WixToolset.BootstrapperApplicationApi` 中，因此现在有一个单独的包用于自定义引导程序。
* `WixToolset.BextUtil` - 重命名为 `WixToolset.BootstrapperExtensionApi`。
* `WixToolset.Bal.wixext` - 重命名为 `WixToolset.BootstrapperApplications.wixext`，但为了与 MSBuild 项目的 `PackageReference` 向后兼容，仍保留了 `WixToolset.Bal.wixext`。注意：使用 `wix.exe` 时，需要使用新名称 `WixToolset.BootstrapperApplications.wixext`。


:::tip
设置一个名为 `WixDebugBootstrapperApplications` 的 **系统** 环境变量为 `true`，可以获得调试 _所有_ 引导程序的提示。设置一个名为 `WixDebugBootstrapperApplication` 的 **系统** 环境变量为引导程序可执行文件的文件名，可以获得调试该引导程序的提示。
:::


相关问题

* [#7916 - 引导程序进程](https://github.com/wixtoolset/issues/issues/7916)
* [#8020 - 更好的 Burn 相关 .nupkg 名称](https://github.com/wixtoolset/issues/issues/8020)
