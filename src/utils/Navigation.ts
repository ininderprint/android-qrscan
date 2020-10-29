import { NavigationActions, StackActions } from 'react-navigation';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params = {}) {
  console.log('navigate', routeName)
  if (!_navigator || !_navigator.dispatch) {
    setTimeout(() => {
      navigate(routeName, params)
    }, 500);
    return
  }
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack(key?: string) {
  _navigator.dispatch(NavigationActions.back({
    key: key || null
  }));
}

function replace(routeName: string, params = {}) {
  console.log('replace', routeName)
  const replaceAction = StackActions.replace({
    routeName,
    params
  });
  _navigator.dispatch(replaceAction);
}

// add other navigation functions that you need and export them

export default {
  goBack,
  navigate,
  replace,
  setTopLevelNavigator
};