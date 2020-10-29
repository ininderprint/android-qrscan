/**
 * 页面组件Props基础
 */
export interface CrossPageProps {
  isModal?: boolean;
  navigation?: CrossPageNavigation;
}

export interface CrossPageNavigation {
  goBack: () => void;
  navigate: (pageName: string, params?: {
    query?: object;
    params?: object;
  }) => void;
  redirect: (pageName: string, params?: {
    query?: object;
    params?: object;
  }) => void;
}
