import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import api from 'api';
import ReduxProvider from 'ReduxProvider';
import RbacProvider from 'modules/auth/RbacContext';
import UserProvider from 'modules/auth/UserContext';
import checkAccess from 'modules/auth/hoc/checkAccess';
import { TYPE_PERMISSION, TYPE_ROLE } from 'modules/auth';

describe('Testing HOC checkAccess', () => {
    beforeEach(() => {
        moxios.install(api.axios);
        moxios.stubRequest('/api/auth/rbac-items', {
            status: 200,
            responseText: JSON.stringify({
                //permissions
                'createPost': {
                    'type': TYPE_PERMISSION,
                    'description': 'Create a post',
                    'rule': null,
                },
                'readPost': {
                    'type': TYPE_PERMISSION,
                    'description':'Read a post',
                    'rule': null,
                },
                'updatePost': {
                    'type': TYPE_PERMISSION,
                    'description': 'Update a post',
                    'rule': null,
                },
                'updateOwnPost': {
                    'type': TYPE_PERMISSION,
                    'description': 'Update own post',
                    'children': ['updatePost'],
                    'rule': (user, params) => {
                        return params['authorID'] === user.id;
                    },
                },

                // roles
                'reader': {
                    'type': TYPE_ROLE,
                    'description': '',
                    'children': ['readPost'],
                    'rule': null,
                },
                'author': {
                    'type': TYPE_ROLE,
                    'description': '',
                    'rule': null,
                    'children': ['createPost', 'updateOwnPost', 'reader'],
                },
                'admin': {
                    'type': TYPE_ROLE,
                    'description': '',
                    'rule': null,
                    'children': ['author', 'updatePost'],
                },
            }, function(key, value) {
                if (typeof value === 'function') {
                    return `/Function(${value.toString()})/`;
                }
                return value;
            })
        });
    });

    afterEach(() => {
        moxios.uninstall(api.axios)
    });

    describe('Checking reader permissions', () => {
        beforeEach(() => {
            moxios.stubRequest('/api/auth/me', {
                status: 200,
                response: {
                    user: {
                        id: 'reader',
                        assignments: ['reader']
                    },
                    token: 'readerToken',
                }
            });
        });

        test('Reader shouldn\'t can create posts', () => {
            const _checkAccess = checkAccess({
                allow: true,
                roles: ['createPost'],
                noAccess: () => <div className='no'>No</div>
            })(() => <div className='yes'>Yes</div>);

            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'readerToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <_checkAccess />
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.no').exists()).toBeTruthy();
                wrapped.unmount();
            });
        });
    });
});
