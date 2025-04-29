import AddSliceForm from './components/AddSliceForm';
import SliceList from './components/SliceList';
import SpinButton from './components/SpinButton';

function App() {
  return (
    <div>
      <h1>🎡 Wheel of Fortune</h1>
      <AddSliceForm onAdd={() => window.location.reload()} />
      <SliceList />
      <SpinButton />
    </div>
  );
}

export default App;
