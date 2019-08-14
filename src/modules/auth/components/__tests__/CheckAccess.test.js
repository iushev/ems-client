import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import api from 'api';
import ReduxProvider from 'ReduxProvider';
import RbacProvider from 'modules/auth/RbacContext';
import UserProvider from 'modules/auth/UserContext';
import CheckAccess from 'modules/auth/components/CheckAccess';
import { TYPE_PERMISSION, TYPE_ROLE } from 'modules/auth';

describe('Testing CheckAccess component', () => {
    beforeEach(() => {
        moxios.install(api.axios);
        moxios.stubRequest('/api/auth/rbac', {
            status: 200,
            responseText: JSON.stringify({
                items: {
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
                        'rule': 'isAuthor',
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
                },
                rules: {
                    'isAuthor': {
                        'description': '',
                        'execute': (userId, params) => {
                            return params['authorID'] === userId;
                        },
                    },
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

        test('Reader shouldn\'t can create posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'readerToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['createPost']}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.no').exists()).toBeTruthy();
                done();
                wrapped.unmount();
            })
        });

        test('Reader should can read posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'readerToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['readPost']}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.yes').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            })
        });

        test('Reader shouldn\'t can update posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'readerToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['updatePost']}
                                roleParams={{
                                    authorID: 'author',
                                }}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.no').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            });
        });
    });

    describe('Checking author permissions', () => {
        beforeEach(() => {
            moxios.stubRequest('/api/auth/me', {
                status: 200,
                response: {
                    user: {
                        id: 'author',
                        assignments: ['author']
                    },
                    token: 'authorToken',
                }
            });
        });

        test('Author should can create posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'authorToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['createPost']}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.yes').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            });
        });

        test('Author should can read posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'authorToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['readPost']}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.yes').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            });
        });

        test('Author should can update posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'authorToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['updatePost']}
                                roleParams={{
                                    authorID: 'author',
                                }}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.yes').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            });
        });

        test('Author should can update only own posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'authorToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['updatePost']}
                                roleParams={{
                                    authorID: 'other_author',
                                }}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.no').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            });
        });
    });

    describe('Checking admin permissions', () => {
        beforeEach(() => {
            moxios.stubRequest('/api/auth/me', {
                status: 200,
                response: {
                    user: {
                        id: 'admin',
                        assignments: ['admin']
                    },
                    token: 'adminToken',
                }
            });
        });

        test('Admin should can create posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'adminToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['createPost']}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.yes').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            });
        });

        test('Admin should can read posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'adminToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['readPost']}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.yes').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            });
        });

        test('Admin should can update posts', (done) => {
            const wrapped = mount(
                <ReduxProvider initialState={{
                    auth: {
                        token: 'adminToken',
                    }
                }}>
                    <RbacProvider>
                        <UserProvider>
                            <CheckAccess
                                roles={['updatePost']}
                                roleParams={{
                                    authorID: 'author',
                                }}
                                noAccess={() => <div className='no'>No</div>}
                            >
                                <div className='yes'>Yes</div>
                            </CheckAccess>
                        </UserProvider>
                    </RbacProvider>
                </ReduxProvider>
            );
            moxios.wait(() => {
                wrapped.update();
                expect(wrapped.find('.yes').exists()).toBeTruthy();
                wrapped.unmount();
                done();
            });
        });
    });

    test('Guest user should have access', (done) => {
        const wrapped = mount(
            <ReduxProvider initialState={{
                auth: {
                    token: null,
                }
            }}>
                <RbacProvider>
                    <UserProvider>
                        <CheckAccess
                            roles={['?']}
                            noAccess={() => <div className='no'>No</div>}
                        >
                            <div className='yes'>Yes</div>
                        </CheckAccess>
                    </UserProvider>
                </RbacProvider>
            </ReduxProvider>
        );
        moxios.wait(() => {
            wrapped.update();
            expect(wrapped.find('.yes').exists()).toBeTruthy();
            wrapped.unmount();
            done();
        });
    });

    test('Guest user shouldn\'t have access', (done) => {
        const wrapped = mount(
            <ReduxProvider initialState={{
                auth: {
                    token: null,
                }
            }}>
                <RbacProvider>
                    <UserProvider>
                        <CheckAccess
                            allow={false}
                            roles={['?']}
                            noAccess={() => <div className='no'>No</div>}
                        >
                            <div className='yes'>Yes</div>
                        </CheckAccess>
                    </UserProvider>
                </RbacProvider>
            </ReduxProvider>
        );
        moxios.wait(() => {
            wrapped.update();
            expect(wrapped.find('.no').exists()).toBeTruthy();
            wrapped.unmount();
            done();
        });
    });

    test('Registered user should have access', (done) => {
        moxios.stubRequest('/api/auth/me', {
            status: 200,
            response: {
                user: {
                    id: 'registered'
                },
                token: 'registeredToken',
            }
        });
        const wrapped = mount(
            <ReduxProvider initialState={{
                auth: {
                    token: 'registeredToken',
                }
            }}>
                <RbacProvider>
                    <UserProvider>
                        <CheckAccess
                            roles={['@']}
                            noAccess={() => <div className='no'>No</div>}
                        >
                            <div className='yes'>Yes</div>
                        </CheckAccess>
                    </UserProvider>
                </RbacProvider>
            </ReduxProvider>
        );
        moxios.wait(() => {
            wrapped.update();
            expect(wrapped.find('.yes').exists()).toBeTruthy();
            wrapped.unmount();
            done();
        });
    });

    test('Registered user shouldn\'t have access', (done) => {
        moxios.stubRequest('/api/auth/me', {
            status: 200,
            response: {
                user: {
                    id: 'registered'
                },
                token: 'registeredToken',
            }
        });
        const wrapped = mount(
            <ReduxProvider initialState={{
                auth: {
                    token: 'registeredToken',
                }
            }}>
                <RbacProvider>
                    <UserProvider>
                        <CheckAccess
                            allow={false}
                            roles={['@']}
                            noAccess={() => <div className='no'>No</div>}
                        >
                            <div className='yes'>Yes</div>
                        </CheckAccess>
                    </UserProvider>
                </RbacProvider>
            </ReduxProvider>
        );
        moxios.wait(() => {
            wrapped.update();
            expect(wrapped.find('.no').exists()).toBeTruthy();
            wrapped.unmount();
            done();
        });
    });

    test('Anonymous user shouldn\'t have access', (done) => {
        const wrapped = mount(
            <ReduxProvider initialState={{
                auth: {
                    token: null,
                }
            }}>
                <RbacProvider>
                    <UserProvider>
                        <CheckAccess
                            roles={['@']}
                            noAccess={() => <div className='no'>No</div>}
                        >
                            <div className='yes'>Yes</div>
                        </CheckAccess>
                    </UserProvider>
                </RbacProvider>
            </ReduxProvider>
        );
        moxios.wait(() => {
            wrapped.update();
            expect(wrapped.find('.no').exists()).toBeTruthy();
            wrapped.unmount();
            done();
        });
    });
});
