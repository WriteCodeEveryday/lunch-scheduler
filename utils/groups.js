let GROUP_SIZE = 5;
let REMAINDER_MIN = 3;

const makeGroups = (initial, count, remainder) => {
    let groups = [];
    for (i=0,j=count*GROUP_SIZE; i<j; i+=GROUP_SIZE) {
        groups.push(initial.slice(i,i+GROUP_SIZE));
    }

    let remainder_start = count*GROUP_SIZE;
    if (remainder > GROUP_SIZE) {
        if (remainder - REMAINDER_MIN > REMAINDER_MIN) {
            let first = REMAINDER_MIN;
            let second = remainder - REMAINDER_MIN;
            groups.push(initial.slice(remainder_start, remainder_start + first));
            groups.push(initial.slice(remainder_start + first, remainder_start + second));
        }
    } else {
        groups.push(initial.slice(remainder_start, remainder_start + remainder));
    }

    return groups;
}

const createGroups = (initial) => {
    let count = initial.length / GROUP_SIZE;
    let remainder = initial.length % GROUP_SIZE;

    let groups = [];
    if (remainder < REMAINDER_MIN) {
        if (count > 0) {
            //We have N(count-1) groups with Z+5(remainder) for a final group.
            groups = makeGroups(count - 1, remainder + GROUP_SIZE)
        }
    } else {
        //We have N(count) groups with Z(remainder) for a final group.
        groups = makeGroups(count, remainder)
    }

    return groups;
}

module.exports = { createGroups };