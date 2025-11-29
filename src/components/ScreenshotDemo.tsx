import React, { createRef, useState } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { PieChart, Pie } from 'recharts';

// Sample data for the chart
const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 }
];

const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 }
];

const ScreenshotDemo: React.FC = () => {
    const ref = createRef<HTMLDivElement>();
    const ref2 = createRef<HTMLDivElement>();
    const [image2, setImage2] = useState<string | null>(null);

    const [image, takeScreenShot] = useScreenshot({
        type: 'image/jpeg',
        quality: 1.0
    });

    const takeScreenshot = () => {
        if (ref.current) {
            takeScreenShot(ref.current, { scale: 2 });
        }
    };

    const takeScreenshotWithoutHook = async () => {
        if (ref2.current) {
            const canvas = await html2canvas(ref2.current, { scale: 2 });
            const image = canvas.toDataURL('image/jpeg', 1.0);
            setImage2(image);
        }
    };

    return (
        <div className='p-5'>
            <h1>Screenshot Demo</h1>
            <div className='flex gap-5'>
                <div>
                    <button
                        onClick={takeScreenshot}
                        className='bg-[#4CAF50] text-white px-5 py-2 rounded-lg cursor-pointer my-5'
                    >
                        📸 Take Screenshot
                    </button>
                    <div
                        ref={ref}
                        className='bg-[#2f1414ff] p-5 border border-[#ddd] rounded-lg'
                    >
                        <h2 className="font-open-sans"><AddAlertIcon />use react screenshot hook</h2>

                        <div className="mb-5">
                            <h3 className="font-roboto">Sample Text</h3>
                            <p className="font-playwrite">This is some sample text that will be captured in the screenshot with react screenshot hook.</p>
                        </div>

                        <div>
                            <h3 className="font-open-sans text-center">Charts</h3>
                            <PieChart width={730} height={250}>
                                <Pie
                                    data={data01}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                />
                                <Pie
                                    data={data02}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#82ca9d"
                                    label
                                />
                            </PieChart>
                        </div>
                    </div>
                    <div className='w-full'>{image && <img src={image} alt="Screenshot" />}</div>
                </div>
                <div>
                    <button
                        onClick={takeScreenshotWithoutHook}
                        className='bg-[#4CAF50] text-white px-5 py-2 rounded-lg cursor-pointer my-5'
                    >
                        📸 Take Screenshot
                    </button>
                    <div
                        ref={ref2}
                        className='bg-[#2f1414ff] p-5 border border-[#ddd] rounded-lg'
                    >
                        <h2 className="font-open-sans"><AddAlertIcon />Only html-to-screenshot</h2>

                        <div className="mb-5">
                            <h3 className="font-roboto">Sample Text</h3>
                            <p className="font-playwrite">This is some sample text that will be captured in the screenshot using html2canvas without hook.</p>
                        </div>

                        <div>
                            <h3 className="font-open-sans text-center">Charts</h3>
                            <PieChart width={730} height={250}>
                                <Pie
                                    data={data01}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                />
                                <Pie
                                    data={data02}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#82ca9d"
                                    label
                                />
                            </PieChart>
                        </div>
                    </div>
                    <div className='w-full'>{image2 && <img src={image2} alt="Screenshot" />}</div>
                </div>
            </div>
        </div>
    );
};

export default ScreenshotDemo;