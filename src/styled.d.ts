// src/styled.d.ts
import 'styled-components';
import { type Theme } from './themes'; // Import your Theme type

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends Theme { }
}