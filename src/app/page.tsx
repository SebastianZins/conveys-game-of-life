import Grid from './components/grid';

export default function Home() {
    return (
        <main className='flex flex-col h-full justify-center'>
            <div className='flex w-full justify-center'>
                <div className='flex flex-col shadow-xl border'>
                    <Grid />
                    <div className='h-[100px] bg-orange-400'>Test</div>
                </div>
            </div>
        </main>
    );
}
