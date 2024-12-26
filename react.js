/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-12-25 15:26:53
 */
const reactNote = `React 性能优化的手段
React 中进行性能优化的手段

1. 组件优化

使用PureComponent或React.memo：对于仅根据props和state改变才重新渲染的组件，使用React.PureComponent或者对其包装一层React.memo，它们都能通过浅比较props来避免不必要的重新渲染。
shouldComponentUpdate / React Hooks中的useMemo / useCallback：在类组件中实现shouldComponentUpdate生命周期方法来手动控制是否更新组件。在函数组件中，使用useMemo缓存计算结果，useCallback缓存回调函数，防止因依赖项不变而引起的无效渲染。
2. 状态管理与变更

减少不必要的setState调用：合并多次对同一状态的修改，例如使用useState hook时，可以利用函数式的setState来一次性更新多个状态值。
选择性地更新state：只在props或state真正发生变化时才进行更新，避免频繁或大面积的state变更引发大量子组件重新渲染。
3. Virtual DOM与Diff算法优化

合理构建组件层级：保持组件树扁平化，减少不必要的嵌套层次，使React的diff算法更高效。
利用key属性：为列表元素提供稳定的唯一key，帮助React识别并最小化DOM变动。
少用 dom 层级 多使用箭头标签替代
4. 事件处理优化

使用合成事件：React的合成事件系统可以减少全局事件监听器的数量，提高事件处理效率。
避免内联函数绑定：在事件处理函数中，避免每次渲染时创建新的函数引用，而是使用箭头函数或者useCallback来缓存函数引用。
5. 懒加载与代码分割

动态导入：使用React.lazy和Suspense来按需加载组件，减轻初始加载负担，提高首屏加载速度。
使用优先级加载CSS、JavaScript和图片资源。
6.使用ReactDOM.createPortal：将某些组件渲染到根DOM之外，比如渲染到document.body，可以避免不必要的re-render。
7.Fiber数据结构是一个链表，这样就为Fiber架构可中断渲染提供可能`
