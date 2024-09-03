---
sidebar_position: 100
---

# 开发

所以你想要在 WiX 工具集上进行开发？太好了！WiX 的开发是在 [GitHub](https://github.com/wixtoolset/) 上进行的，所以你需要一个 GitHub 账户。你需要在 GitHub 上为 [WiX v4](http://github.com/wixtoolset/wix4) 创建一个 Git 仓库的分支，并将其克隆到你的开发机器上。

1. **找到要处理的内容。** 查看 [issues 数据库](https://github.com/wixtoolset/issues/issues) 中标记为 [`up for grabs`](https://github.com/wixtoolset/issues/issues?q=is%3Aopen+is%3Aissue+label%3A%22up+for+grabs%22) 的问题。如果你有一个新特性的想法，[打开一个新的功能请求](https://github.com/wixtoolset/issues/issues/new/choose)。
2. **声明你的意图。** 如果问题标记为 *No one assigned*，添加一个评论表明你想要处理这个问题。
3. **讨论你打算如何修复错误或实现特性。** 在 [WiX Development](https://github.com/orgs/wixtoolset/discussions/categories/wix-development) 类别的 [WiX 讨论区](https://github.com/orgs/wixtoolset/discussions) 上发起一个讨论线程。
4. **根据反馈进行行动。** 不是每个人都每次都完美（我听说的）。根据你问题的有趣程度，你可能会收到与你的方法一致的反馈或建议替代方案的反馈。不要灰心；免费反馈是贡献开源项目的巨大好处之一。以我们希望它的积极精神来接受它。
5. **如果需要，创建 WiX 改进提案 (WIP)。** WIP 是记录影响问题解决的数据的轻量文档。它们通常不需要用于错误修复，但实现特性通常涉及假设和想法，这些应记录以供后人参考。[WIP 指南](wix-improvement-proposal.md) 包含所有详细信息。
6. **编写代码并测试。** 查看我们的 [代码风格](code-style.md)，在整个项目中编写一致的代码。根据需要添加单元测试和集成测试。记住要在调试模式和发布模式下 [构建 WiX](https://github.com/wixtoolset/wix4#to-build-the-wix-toolset)，并运行 src\test\test.cmd 确保没有破坏任何东西。
7. **发送一个 [pull request](https://help.github.com/articles/using-pull-requests)。** 提交者将审查你的拉取请求，并可能会有需要你进行进一步修改的反馈。审查周期可能会有几轮——我们对代码质量非常严格。
8. **重复**。你的第一个更改被接受并被 WiX 用户在全球范围内使用。去找另一个错误，再次进行处理。

