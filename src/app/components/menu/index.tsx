function Menu() {
    return (
        <menu className='w-[200px] bg-gray-800 border-solid border-l-2 border-slate-500 rounded-r-lg p-4'>
            <section>
                <h2 className='text-lg pb-3'>Spawn Chance</h2>
                <SettingInput cellName='Normal Cell' />
                <SettingInput cellName='Antibody Cell' />
                <SettingInput cellName='Cancer Cell' />
            </section>
            <hr className='my-2' />
            <section>
                <h2 className='text-lg  pb-3'>Corruption Rate</h2>
                <SettingSlider min={0} max={5} step={0.1} />
                <SettingSlider min={0} max={5} step={0.1} />
            </section>
            <hr className='my-2' />
            <section>
                <h2 className='text-lg  pb-3'>Cancer Surv.-Rate</h2>
                <SettingSlider min={0} max={5} step={0.1} />
                <SettingSlider min={0} max={5} step={0.1} />
            </section>
            <hr className='my-2' />
            <section>
                <h2 className='text-lg pb-3 '>Other</h2>
                <SettingSlider min={0} max={5} step={0.1} />
                <SettingSlider min={0} max={5} step={0.1} />
            </section>
            <hr className='my-2' />
            <section>
                <button type='button' className='btn btn-primary btn-lg'>
                    Large button
                </button>
                <button className='w-full'>Add Cancer Cell</button>
            </section>
        </menu>
    );
}

export default Menu;

function SettingSlider({
    min,
    max,
    step,
}: {
    min: number;
    max: number;
    step: number;
}) {
    return (
        <div className='box-border text-sm'>
            <label htmlFor='customRange2' className='form-label '>
                Example range
            </label>
            <input
                type='range'
                className='form-range w-full'
                min='0'
                max='1'
                step='0.05'
                id='customRange2'
            />
        </div>
    );
}

function SettingInput({ cellName }: { cellName: string }) {
    return (
        <div className='input-group mb-2 box-border flex place-content-between text-sm'>
            <span className='input-group-text ' id='basic-addon2'>
                {cellName + ':'}
            </span>
            <input
                type='number'
                className='form-control w-[40%] text-gray-950 rounded-md px-1'
                placeholder='0,0'
                step={0.01}
            />
        </div>
    );
}

/*
Spawn chance normal cell [input between 1 and 0]
spawn chance antibody cell [input between 1 and 0]
spawn chance cancer cell [input between 1 and 0]
corruption rate normal cell [slider 1 - 0]
corruption rate antibody cell [slider 1 - 0]
cancer survivability rate normal cell [slider 1 - 0]
cancer survivability rate antibody cell [slider 1 - 0]
show fading [i/o]
cell sizing [slider 1 - 10]
reset [button]
*/
