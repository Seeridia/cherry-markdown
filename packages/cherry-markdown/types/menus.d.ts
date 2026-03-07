export type MenuIconType = 'svg' | 'lucide' | 'image' | 'element';

export interface CustomMenuIcon {
  type: MenuIconType;
  /**
   * 如果 type 为 'svg'，则该属性为 svg 文件内容
   * 如果 type 为 'lucide'，则该属性为 lucide 图标名称
   * 如果 type 为 'image'，则该属性为img元素的src属性
   */
  content: string;
  /**
   * 设置图标的内联样式
   */
  iconStyle?: string;
  /** 设置class属性 */
  iconClassName?: string;
}

export type IconElement<T extends HTMLElement = HTMLElement> = T;

export interface CustomMenuConfig {
  name: string;
  icon: string | CustomMenuIcon | IconElement;
}
