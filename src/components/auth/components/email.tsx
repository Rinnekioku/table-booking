import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './index';
import { useContext } from 'react';
import { FormDataContext } from '../../views/components/auth/reducer';
import { FromDataContextReducerActions } from '../../views/components/auth/actions';

export function EmailField(props: FormFieldEntity): JSX.Element {
    const [store, dispatch] = useContext(FormDataContext);
    return (
        <Form.Item
            name={props.name}
            rules={props.rules}
            initialValue={store.email}
        >
            <Input
                placeholder={props.placeholder}
                onChange={(e) => {
                    dispatch({
                        type: FromDataContextReducerActions.emailChange,
                        payload: e.target.value,
                    });
                }}
            />
        </Form.Item>
    );
}
