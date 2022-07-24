import { SubmitHandler, useForm } from "react-hook-form";

import CircularProgressCentered from "../../../common/components/CircularProgressCentered";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addDocumentData,
  editDocumentData,
} from "../store/actions/firestoreActions";
import { EntryForm, Input, SelectMenu } from "../components/form";
import ImageUploader from "../components/form/ImageUploader";
import { setShowInputForm } from "../store/reducers/uiReducer";

const ROLE_ITEMS: Role[] = ["admin", "cashier", "manager", "other"];

export default function EmployeeEntryForm() {
  const { selectedEmployee, isEditing, showLoadingSpinner, imagePath } =
    useAppSelector((state) => ({
      selectedEmployee: state.firestore.selectedDocument,
      isEditing: state.form.isEditing,
      showLoadingSpinner: state.ui.showLoadingSpinner,
      imagePath: state.form.imagePath,
    }));

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputValues>();

  const submitHandler: SubmitHandler<InputValues> = (data) => {
    if (isEditing) {
      dispatch(
        editDocumentData(data, "employees", selectedEmployee, imagePath)
      );
    } else {
      dispatch(addDocumentData(data, "employees", imagePath));
    }
    reset();
  };

  if (showLoadingSpinner) return <CircularProgressCentered />;

  return (
    <EntryForm
      title="Employee"
      onClose={() => dispatch(setShowInputForm(false))}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="First Name *"
        id="firstName"
        placeholder="Enter First Name"
        required
        autoFocus
        defaultValue={selectedEmployee?.firstName}
        inputValue="firstName"
        register={register}
        error={errors.firstName}
      />
      <Input
        label="Last Name *"
        id="lastName"
        placeholder="Enter Last Name"
        required
        defaultValue={selectedEmployee?.lastName}
        inputValue="lastName"
        register={register}
        error={errors.lastName}
      />

      <Input
        type="number"
        id="contactNumber"
        label="Contact Number *"
        placeholder="09123456789"
        inputValue="contactNumber"
        valueAsNumber
        required
        defaultValue={selectedEmployee?.contactNumber}
        register={register}
        error={errors.contactNumber}
      />
      <Input
        type="email"
        label="Email *"
        id="email"
        placeholder="Enter Email"
        required
        inputValue="email"
        defaultValue={selectedEmployee?.email}
        register={register}
        error={errors.email}
      />

      <SelectMenu
        items={ROLE_ITEMS}
        id="role"
        label="Role"
        inputValue="role"
        register={register}
        defaultValue={selectedEmployee?.role}
      />
      {/* Image File Upload */}
      <ImageUploader />
    </EntryForm>
  );
}
