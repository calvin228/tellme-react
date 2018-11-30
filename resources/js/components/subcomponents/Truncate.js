//Not a component

function truncate(string) {
    const word =
        string.split(" ").length >= 10
            ? string
                  .split(" ")
                  .slice(0, 9)
                  .concat("...")
                  .join(" ")
            : string;
    return word;
}

const Truncate = (props) => {
    return truncate(props.children);
}

export default Truncate;