import React from "react";

import Typography from "@material-ui/core/Typography";

const NoAccess = () => {
    return (
        <div>
            <Typography variant="h4">Access Denied</Typography>
            <Typography variant="h5">You don't have permission to access.</Typography>
        </div>
    );
};

export default NoAccess;
