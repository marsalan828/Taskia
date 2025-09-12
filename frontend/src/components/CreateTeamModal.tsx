import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MembersSelect from "./MembersSelect";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Validation Schema
const CreateTeamSchema = Yup.object().shape({
  name: Yup.string().required("Team name is required"),
  description: Yup.string().max(500, "Description is too long"),
  members: Yup.array().min(1, "Select at least one member"),
});

const CreateTeamModal = ({ isOpen, onClose }: CreateTeamModalProps) => {
  // Dummy users list (later replace with data from backend/Redux)
  const users = [
    { id: 1, name: "Arsalan" },
    { id: 2, name: "Ali" },
    { id: 3, name: "Sara" },
    { id: 4, name: "Hassan" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Create a Team</h2>

      <Formik
        initialValues={{ name: "", description: "", members: [] }}
        validationSchema={CreateTeamSchema}
        onSubmit={(values) => {
          console.log("Team created:", values);
          onClose();
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Team Name */}
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Enter team name"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter team description"
                rows={3}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Members */}
            <MembersSelect
              users={users}
              values={values}
              setFieldValue={setFieldValue}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateTeamModal;
