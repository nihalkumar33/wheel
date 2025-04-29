import AddSliceForm from '../components/AddSliceForm';

export default function AddSlicePage() {
  return (
    <>
      <h2>Add a New Prize</h2>
      <AddSliceForm onAdd={() => window.location.reload()} />
    </>
  );
}
