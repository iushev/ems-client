import React from "react";

import Layout from "./Layout";

// import SelectField from "modules/common/components/Form/SelectField";
// import SelectCustomerModal from "modules/commerce/components/SelectCustomerModal";
// import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";

const debug = require("debug")("ems");

// const SelectModal = ({ isOpen, onClose, onSelect }) => {
//     return (
//         <Dialog
//             open={isOpen}
//             onClose={onClose}
//         >
//             <DialogTitle>
//                 Select
//             </DialogTitle>
//             <DialogContent>
//                 <DialogContentText>Objects</DialogContentText>
//             </DialogContent>
//         </Dialog>
//     );
// }

// const SelectInput = ({ input : displayInput }) => {
//     const [isOpenSelectModal, setIsOpenSelectModa] = useState(false);

//     function openSelectModal() {
//         setIsOpenSelectModa(true);
//     }

//     function closeSelectModal() {
//         setIsOpenSelectModa(false);
//     }

//     console.log(displayInput);

//     return (
//         <>
//             <input
//                 onClick={openSelectModal}
//                 {...displayInput}
//             />
//             <SelectModal
//                 isOpen={isOpenSelectModal}
//                 onClose={closeSelectModal}
//             />
//         </>
//     );
// }

// const TestForm = reduxForm({
//     form: "text-form",
//     enableReinitialize: true,
// })(({ handleSubmit, change }) => {
//     function submitForm(data) {

//     }
//     return (
//         <Form id={"text-form"} onSubmit={handleSubmit(submitForm)} noValidate autoComplete="off">
//             <Field name="object_id" component="input" type="hidden" />
//             <Field
//                 name="object.display_name"
//                 component={SelectInput}
//             />
//         </Form>
//     );
// });

const Dashboard = () => {
    debug("Render [Dashboard]");
    return (
        <Layout>
            Dashboard
            {/* <TestForm /> */}
        </Layout>
    );
};

export default Dashboard;
