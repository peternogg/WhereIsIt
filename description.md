## Product Location
The store is separated into aisles, and each aisle is separated into sections. These sections are further separated into shelves. For a typical non-refrigerated aisle, like the one the cereal is on, the aisle is the shelves on either side. The sections are unique, so they could be numbered, say, 1 to 10 on the right, and 11 to 20 on the left. The shelf is then one of the four or five or so actual platforms within that section. 

Generally, you walk through an aisle, past a section, and along a shelf.

The ordering of the aisle, section, and shelf is somewhat arbitrary. The section and shelf are subsets of the aisle, but the 'section' is a made-up division in order to make it easier to actually find an object. An aisle of canned food has a lot of repeated shapes, and saying 'it's on the second shelf of the canned food aisle' doesn't really help, I think. So, 

## Amorphous sections
Store areas like the produce department, meat department, or walkways with displays don't lend themselves exactly to the metaphor of 'shelves in sections'. It's possible to conceptualize the displays or stands as aisles themselves, and we could think of the section as top and bottom, front and back, or left and right. The shelf could then be whatever container holds the object.

A complete product, packaged as an app and web service, could include some sort of map to show where within the store an object is and to clear up the meaning of shelf and section for a user.

## Data storage
Included in this repository is a sqlite database which the script works with. It contains a single table, products, which holds the name of a product and its location. Each column is typed as text, so the format of the location is allowed to vary. For example, 'milk' is in aisle D2, which is Dairy 2. This could refer to the right side of a refrigerated aisle, or perhaps an aisle across a walkway. 

An alternate representation is to place each aisle inside of a department to more closely match the actual layout and structure of a store.

## Extension
### Generic products (Honey Nut Cheerios vs Honey Rings)
Some specific products, like Xerox or Kleenex, have had their name coopted to refer to a generic class of products. A user might search 'cheerios,' intending to find _any_ sort of ring-shaped wheat cereal. It may not always be the case, also, that the generic or store-brand version of a product is immediately beside the name-brand version because of name-brand contracts. 

Another table which relates store brand products to their name brand equivalents would help to link these in searches. Any search which matches the name of any product with an equivalent brand should then match all equivalent brands, as if they all had that name.

### Out of Stock
It could be possible to integrate with a store's inventory management system to tell if an object is currently in or out of stock. The integration depends on the way the IMS works, and what sort of data it provides.

## Similar Products and Ideas
Some stores, like Fred Meyer's and Winco, have maps near their entrances to help customers find particular products. This extends that concept to automate the search and provide a more detailed map, down to the product name.