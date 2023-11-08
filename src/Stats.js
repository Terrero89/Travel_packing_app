


export default function Stats({ items }) {
    if (!items.length)
      return (
        <p className="stats">
          <em>Start adding some items to your list.</em>
        </p>
      );
  
    //!derive state
    //?it works for better performance, and to know when the state of a variable changes while avoiding unnecessary renders
    const numItems = items.length;
    const numsPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numsPacked / numItems) * 100);
    return (
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You got everything ready to go."
            : `You have ${numItems} items on your list, and you already packed
          ${numsPacked} equal to (${percentage}%) of the total items`}
        </em>
      </footer>
    );
  }