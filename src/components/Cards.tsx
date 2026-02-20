type CardProps = {
    title: string;
    value: number| string;
};

export default function ({title, value}: CardProps){
    return (
        <div className="bg-white p-6 rounded-x1 shadow-md border border-gray-200">
            <p className="text-gray 600 text-sm">{title}</p>
            <p className="text-3x1 font-bold text-gray-900 mt-2">{value}</p>
        </div>
    );
}