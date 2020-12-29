const mytoken = artifacts.require('mytoken');
const truffleAssert = require('truffle-assertions'); // install with: npm install truffle-assertions

contract('PaymentsManager scenario set 1', (accounts) => {

    function padToSameLength(toPad, str) {
      return toPad.padEnd(str.length, '0');
    }
    function isEqual(value, other) {
      // Get the value type
      const type = Object.prototype.toString.call(value);

      // If the two objects are not the same type, return false
      if (type !== Object.prototype.toString.call(other)) return false;

      // If items are not an object or array, return false
      if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

      // Compare the length of the length of the two items
      const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
      const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
      if (valueLen !== otherLen) return false;

      // Compare two items
      const compare = function (item1, item2) {
        // Get the object type
        const itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
          if (!isEqual(item1, item2)) return false;
        }

        // Otherwise, do a simple comparison
        else {
          // If the two items are not the same type, return false
          if (itemType !== Object.prototype.toString.call(item2)) return false;

          // Else if it's a function, convert to a string and compare
          // Otherwise, just compare
          if (itemType === '[object Function]') {
            if (item1.toString() !== item2.toString()) return false;
          } else if (item1 !== item2) return false;
        }
      };

      // Compare properties
      if (type === '[object Array]') {
        for (let i = 0; i < valueLen; i++) {
          if (compare(value[i], other[i]) === false) return false;
        }
      } else {
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            if (compare(value[key], other[key]) === false) return false;
          }
        }
      }

      // If nothing failed, return true
      return true;
    }
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];

    let tx;

    before(async () => {
        instance = await mytoken.new({ from: owner });
        console.log('mytoken instantiated, address is', instance.address);
    });
    
    it('Should start with zero calls', async () => {
        let calls = await instance.viewCalls();
        assert.equal(calls, 0, "Number of calls not initialized to zero");
        let calls2 = await instance.manyCalls();
        assert.equal(calls2, 0, "manyCalls not initialized to zero");
    });
    
    it('Should be able to call a function', async () => {
        tx = await instance.callFunction(34, {from: user1});
        truffleAssert.eventEmitted(tx, 'functionCalled', event => (
            event.whoCalled === user1
            && event.param == 34
            && event.callsSoFar == 1
          ));

        });

    it('Should follow with one call', async () => {
        let calls = await instance.viewCalls();
        assert.equal(calls, 1, "Incorrect numnber of calls");
        let calls2 = await instance.manyCalls();
        assert.equal(calls2, 1, "Incorrect manyCalls");
    });
    
});
