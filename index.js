class SplitBill {
  group = new Map();
  createTripGroup(name) {
    if (name.length > 0 && !this.doesGroupExist(name)) {
      this.group.set(name, new TripGroup());
      return true;
    }
    return false;
  }
  doesGroupExist(name) {
    return this.group.has(name);
  }
  addMember(group, name) {
    if (group.length > 0 && name.length > 0 && this.doesGroupExist(group)) {
      group = this.group.get(group);
      if (!group.doesMemberExist(name)) {
        group.addMember(name);
        return true;
      }
    }
    return false;
  }
  addExpenses(group, member, amount) {
    if (
      group.length > 0 &&
      member.length > 0 &&
      amount > 0 &&
      this.doesGroupExist(group)
    ) {
      group = this.group.get(group);
      if (group.doesMemberExist(member)) {
        group.addExpenses(member, amount);
        return true;
      }
    }
    return false;
  }
  showGroup(group) {
    if (this.doesGroupExist(group)) {
      let groupName = group;
      group = this.group.get(group);
      let response = group.showGroupDetails();
      let responseObject = {};
      responseObject[groupName] = response;

      console.log(responseObject);
      return responseObject;
    }
    return [];
  }
  showExpensesAfterSplit(group) {
    if (this.doesGroupExist(group)) {
      group = this.group.get(group);
      group.showExpensesAfterSplit();
    }
  }

  // Extra work
  extraFunction() {
    let groupName = "team2";
    let trip = this.createTripGroup(groupName);
    let memberArray = ["first", "second", "third", "fourth", "five"];
    memberArray.forEach((member) => {
      this.addMember(groupName, member);
    });
    memberArray.forEach((member) => {
      this.addExpenses(groupName, member, Math.floor(Math.random() * 100));
    });
    this.showExpensesAfterSplit(groupName);
  }
}

class TripGroup {
  memberList = new Map();
  addMember(name) {
    this.memberList.set(name, new Member(name));
  }
  doesMemberExist(name) {
    return this.memberList.has(name);
  }
  getMember(name) {
    return this.memberList.get(name);
  }
  addExpenses(member, amount) {
    member = this.getMember(member);
    member.addExpenses(amount);
    return true;
  }
  showGroupDetails() {
    let arr = [];
    for (let [key, member] of this.memberList) {
      //   console.log(key);
      member = this.getMember(key);
      arr.push(member.getMember());
    }
    return arr;
  }
  showExpensesAfterSplit() {
    let response = this.showGroupDetails();

    // Calculating the total Amount spend by all the members
    if (response !== undefined && response.length > 0) {
      let totalAmountSpent = 0;
      for (let iterator = 0; iterator < response.length; iterator++) {
        totalAmountSpent += +response[iterator].spendAmount;
      }

      // Calculating Average amount each should have expected to pay
      let averageAmount = Math.floor(totalAmountSpent / response.length);

      //  Spliting the Amount among the members
      for (let iterator = 0; iterator < response.length; iterator++) {
        let member = response[iterator];
        if (member.spendAmount >= averageAmount) {
          member.loanAmount = 0;
        } else {
          member.loanAmount = averageAmount - member.spendAmount;
        }
      }
      console.log(response);
      return true;
    }
    return false;
  }
}

class Member {
  obj = {
    name: "",
    spendAmount: "",
    loanAmount: "",
    loanAmountFrom: "",
  };
  constructor(name) {
    this.obj.name = name;
  }
  addExpenses(amount) {
    this.obj.spendAmount += amount;
    return true;
  }
  getMember() {
    return this.obj;
  }
}

var splitBill = new SplitBill();
splitBill.createTripGroup("Goa group");
splitBill.addMember("Goa group", "Gyaneshwar");
splitBill.addMember("Goa group", "Vinay");
splitBill.addMember("Goa group", "Atul");
splitBill.addExpenses("Goa group", "Gyaneshwar", 30);
splitBill.addExpenses("Goa group", "Vinay", 30);
splitBill.addExpenses("Goa group", "Atul", 30);
splitBill.showExpensesAfterSplit("Goa group");
// splitBill.showGroup("Goa group");


var splitBill2 = new SplitBill();
splitBill2.extraFunction();

