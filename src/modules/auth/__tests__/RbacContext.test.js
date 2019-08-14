import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';

import api from 'api';
import RbacProvider from 'modules/auth/RbacContext';
import ReduxProvider from 'ReduxProvider';

describe('RbacContext testing', () => {
    beforeEach(() => {
        moxios.install(api.axios);
    });

    afterEach(() => {
        moxios.uninstall(api.axios)
    });

    test('It should retrieve RBAC items', () => {
        moxios.stubRequest('/api/auth/rbac', {
            status: 200,
            responseText: JSON.stringify({
                items: {
                    'createPost': {
                        'description': 'Create a post',
                        'rule': null,
                    }
                },
                rules: {}
            })
        });

        const wrapped = mount(
            <ReduxProvider>
                <RbacProvider />
            </ReduxProvider>
        );

        moxios.wait(() => {
            expect(wrapped.state('rbacItems')).toEqual({
                items: {
                    'createPost': {
                        'description': 'Create a post',
                        'rule': null,
                    }
                },
                rules: {}
            });
            wrapped.unmount();
        });
    });
});