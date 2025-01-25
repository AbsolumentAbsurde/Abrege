import './App.css'
import UserBox from '/src/ui/components/UserBox.jsx'

function App() {
  return (
   <div className='flex flex-col h-full w-full pt-8 items-center gap-11 lg:bg-slate-300 lg:w-[50rem] xl:gap-28'>
    <div className='flex flex-col justify-center items-center top-4'>
      <h1 className='text-white font-VNvar text-lg lg:text-4xl'>Parce qu'on a pas toujours le temps...</h1>
    </div>
      <UserBox/>
   </div>
  );
}

export default App;