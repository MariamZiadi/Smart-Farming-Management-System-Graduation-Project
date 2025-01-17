declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module 'react-native-vector-icons/MaterialIcons' {
    import { Icon } from 'react-native-vector-icons/Icon';
    export default Icon;
  }
  
  declare module 'react-native-vector-icons/*' {
    import { Icon } from 'react-native-vector-icons/Icon';
    export default Icon;
  }
  