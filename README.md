# 介绍

> 这是 Johnson Huang 的[博客](https://johnsonhuang4396.github.io/notebook/)，基于`Vitepress`实现

## 最近更新

### Vue 响应式系统原理深度解析 (2024-12)
在基础知识文档中增加了 Vue 响应式系统的完整实现原理，包含：

**computed、watch 和 watchEffect 原理**
- Vue2 computed 的 Watcher 机制和缓存实现
- Vue3 computed 的 ReactiveEffect 机制完整源码
- ComputedRefImpl 类的详细实现和类型定义  
- 懒计算、缓存机制、依赖收集的完整示例
- watch 监听器的依赖收集原理
- watchEffect 自动依赖收集和立即执行机制
- watchEffect vs watch 的详细对比分析和最佳实践
- Vue2 与 Vue3 在实现上的深度对比分析

**Effect 数据劫持核心机制**
- ReactiveEffect 类的完整实现
- track/trigger 依赖收集和更新触发机制
- Proxy 劫持的详细源码分析
- get/set 处理器的核心逻辑
- 与 Vue2 Object.defineProperty 的深度对比

**完整数据流**
- 响应式对象创建到依赖收集的完整流程
- 数据变化触发更新的详细机制
- computed、watch、effect 三者的协同工作原理

# 目录

- **HTML** - HTML 基础知识和进阶内容
- **JS** - JavaScript 核心概念和实际应用
- **Vue** - Vue.js 框架相关技术栈
- **Node** - Node.js 后端开发
- **面经** - 前端面试经验分享
- **笔记** - 个人学习笔记和技术总结

## 特色内容

- **手写实现** - 包含防抖节流、深拷贝、Promise等核心算法的手写实现
- **原理解析** - 深入分析框架和库的底层实现原理
- **实战经验** - 结合实际项目的开发经验和最佳实践
