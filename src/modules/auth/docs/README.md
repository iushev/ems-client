# RBAC

## Define RBAC rules

```javascript
const rbac = {
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
            'execute': (user, params) => {
                return +params['authorID'] === +user;
            },
        },
    }
};
```

Check access for route
```
// Allow user having permission 'createPost' to access dashboard view
<Route path='/dashboard' component={checkAccess({
    roles: ['createPost'],
    noAccess: () => {}
})(Dashboard)} />

<Route path='/dashboard' component={checkAccess({
    roles: ['?'], // anonymous user
    noAccess: () => {}
})(Dashboard)} />

<Route path='/dashboard' component={checkAccess({
    roles: ['@'], // authenticated user
    noAccess: () => {}
})(Dashboard)} />

// Permit access to all that not have 'createPost' permission
<Route path='/dashboard' component={checkAccess({
    allow: false,
    roles: ['createPost'],
    noAccess: () => {}
})(Dashboard)} />

// apply params that will pass to rule function
<Route path='/dashboard' component={checkAccess({
    roles: ['updatePost'],
    roleParams: {
        authorID: userAuthor.id,
    },
    noAccess: () => {}
})(Dashboard)} />

// apply params that will pass to rule function
<Route path='/dashboard' component={checkAccess({
    roles: ['updatePost'],
    roleParams: () => ({
        authorID: userAuthor.id,
    }),
    noAccess: () => {}
})(Dashboard)} />
```

Check access in component
```
<CheckAccess
    roles={['updatePost']}
    noAccess={() => {}}
>
    <div className='yes'>Yes</div>
</CheckAccess>
```
