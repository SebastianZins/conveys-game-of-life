import Grid from './components/grid';
import Menu from './components/menu';

export default function Home() {
    return (
        <main className='flex flex-col h-full justify-center'>
            <div className='flex w-full justify-center'>
                <div className='flex shadow-xl border border-slate-500 rounded-lg'>
                    <Grid />
                    <Menu />
                </div>
            </div>
        </main>
    );
}
