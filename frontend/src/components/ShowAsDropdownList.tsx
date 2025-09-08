export default function ShowAsDropdownList({ enumValues, value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ padding: "1px", width: "100%" }}
        >
            <option value="">Select a value</option>
            {enumValues.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}
