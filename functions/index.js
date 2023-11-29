/**
 * This example functions looks for bookings changes and populates the `lastWrittenTime` field
 *
 * @type {ChangeFunc}
 */
const example = (change, store) => {
  if (change.ref.path.startsWith('bookings/')) {
    console.log(`[example] booking change: ${change.ref.path}, title: '${change.document.title}'`);
    store.setDoc(change.ref, {
      ...change.document,
      lastWrittenTime: new Date()
    });
  }
};

const autoRoomCreation = (change, store) => {
  // Make sure its only on booking requests/changes
  if (change.ref.path.startsWith('bookings/')) {
    // get the Rooms collection
    const collection = store.getCollection({ path: 'rooms' });
    // Creates a array for the room titles
    let titleArr = [];
    for (const item of collection) {
      titleArr.push(item.document.title);
    }
    // Checks if the room title is in the array - if it is not then we push it to the rooms collection
    if (!titleArr.includes(change.document.room.title)) {
      store.setDoc({ path: 'rooms/' + change.document.room.title }, { title: change.document.room.title, capacity: 'Waiting for Value' });
    }
  }
};

/**
 * Any function exported here will be called whenever there is a data change in the store.
 *
 * @type {Object<string, ChangeFunc>}
 */
module.exports = {
  example,
  autoRoomCreation,
};
