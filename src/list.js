export default class List {
  constructor() {
    this.list = JSON.parse(localStorage.getItem('todo-list'));
    if (!this.list) {
      this.list = [];
    }
    this.display();
  }

  display() {
    this.saveData();
    const listSection = document.querySelector('#list-items');
    listSection.innerHTML = '';
    this.list.forEach((activity) => {
      let activityItem = `
        <li class="d-flex s-between list-item" id="item-data-${activity.index}">`;
      if (activity.completed) {
        activityItem += `
            <span class="material-icons done update-status" data="${activity.index}">
              done
            </span>
            <p contenteditable="true" class="completed activity" data="${activity.index}">
              ${activity.description}
            </p>
            `;
      } else {
        activityItem += `
            <span class="material-icons  update-status"  data="${activity.index}">
              check_box_outline_blank
            </span>
            <p contenteditable="true" class="activity" data="${activity.index}">
              ${activity.description}
            </p>`;
      }
      activityItem += `
          <span class="material-icons delete-activity" data="${activity.index}">
            delete
          </span>
        </li>
      `;
      listSection.innerHTML += activityItem;
    });
    this.activateActions();
  }

  addActivity(activity) {
    if (activity || activity === 0) {
      const newActivity = {
        description: activity,
        completed: false,
        index: (this.list.length + 1),
      };
      this.list.push(newActivity);
      this.display();
    }
  }

  deleteActivity(activityIndex) {
    if (activityIndex) {
      this.list.splice((activityIndex - 1), 1);
      this.display();
    }
  }

  updateActivityStatus(activityIndex) {
    activityIndex -= 1;
    if (activityIndex !== undefined) {
      if (this.list[activityIndex].completed === true) {
        this.list[activityIndex].completed = false;
      } else {
        this.list[activityIndex].completed = true;
      }
    }
    this.display();
  }

  clearCompleted() {
    this.list = this.list.filter((activity) => activity.completed === false);
    this.display();
  }

  clearAll() {
    this.list.splice(0);
    this.display();
  }

  saveData() {
    for (let i = 0; i < this.list.length; i += 1) {
      this.list[i].index = (i + 1);
    }
    this.list.sort((a, b) => {
      if (a.index < b.index) return -1;
      if (a.index > b.index) return 1;
      return 0;
    });
    localStorage.setItem('todo-list', JSON.stringify(this.list));
  }

  editActivity(index, description) {
    this.list[index - 1].description = description;
    this.saveData();
  }

  activateActions() {
    // This code changes checkbox activity
    const updateStatusBtns = document.querySelectorAll('.update-status');
    if (updateStatusBtns !== null) {
      updateStatusBtns.forEach((item) => {
        item.addEventListener('click', () => {
          this.updateActivityStatus(item.getAttribute('data'));
        });
      });
    }
    // this code is for the delete activity button
    const deleteBtns = document.querySelectorAll('.delete-activity');
    if (deleteBtns) {
      deleteBtns.forEach((activity) => {
        activity.addEventListener('click', () => {
          this.deleteActivity(activity.getAttribute('data'));
        });
      });
    }
    // this code edits the activity handler
    const activities = document.querySelectorAll('.activity');
    if (activities) {
      activities.forEach((activity) => {
        activity.addEventListener('input', (e) => {
          const description = e.target.innerText;
          const index = e.target.getAttribute('data');
          this.editActivity(index, description);
        });
      });
    }
  }
}