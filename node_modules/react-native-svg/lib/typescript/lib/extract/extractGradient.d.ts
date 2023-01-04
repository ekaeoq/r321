import React, { ReactElement } from 'react';
import { TransformProps } from './types';
export default function extractGradient(props: {
    id?: string;
    children?: ReactElement[];
    transform?: TransformProps['transform'];
    gradientTransform?: TransformProps['transform'];
    gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
} & TransformProps, parent: {}): {
    name: string;
    gradient: number[];
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
    gradientUnits: number;
    gradientTransform: import("./types").ColumnMajorTransformMatrix | null;
} | null;
