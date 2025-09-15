import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MembersSelect from "./MembersSelect";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamFormValues {
  name: string;
  description: string;
  members: string[];
}

type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string | null;
};

const CreateTeamSchema = Yup.object().shape({
  name: Yup.string().required("Team name is required"),
  description: Yup.string().max(500, "Description is too long"),
  members: Yup.array().min(1, "Select at least one member"),
});

const CreateTeamModal = ({ isOpen, onClose }: CreateTeamModalProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList: User[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<User, "id">),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllUsers();
  }, []);

  const handleSubmit = async (
    values: TeamFormValues,
    { resetForm }: { resetForm: () => void },
    onClose: () => void
  ) => {
    try {
      await addDoc(collection(db, "teams"), {
        name: values.name,
        description: values.description,
        members: values.members,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser?.uid,
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-indigo-600">Create a Team</h2>

      <Formik
        initialValues={{ name: "", description: "", members: [] }}
        validationSchema={CreateTeamSchema}
        onSubmit={(values, formikHelpers) =>
          handleSubmit(values, formikHelpers, onClose)
        }
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-4">
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

            <MembersSelect
              users={users}
              values={values}
              setFieldValue={setFieldValue}
            />

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
