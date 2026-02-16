const { getSchedule } = require("../../services/schedule");

Page({
  data: {
    statusBarHeight: 20,
    selectedConcentratedIndex: 0,
    selectedDispersedIndex: 0,
    concentratedTime: {},
    dispersedTime: {},
    concentratedDates: [],
    concentratedMorningCourses: [],
    concentratedAfternoonCourses: [],
    dispersedDates: [],
    dispersedMorningCourses: [],
    dispersedAfternoonRooms: []
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight || 20
    });
    // 首次加载时获取课表数据。
    this.loadSchedule();
  },

  loadSchedule() {
    // 根据接口返回更新页面状态，失败时重置为空。
    getSchedule()
      .then((schedule) => {
        this.setData(schedule || {});
      })
      .catch(() => {
        this.setData({
          concentratedTime: {},
          dispersedTime: {},
          concentratedDates: [],
          concentratedMorningCourses: [],
          concentratedAfternoonCourses: [],
          dispersedDates: [],
          dispersedMorningCourses: [],
          dispersedAfternoonRooms: []
        });
      });
  },

  goToPlaceholder(e) {
    // 功能尚未接入时的提示。
    const title = e.currentTarget.dataset.title || "功能";
    wx.showToast({
      title: `${title}功能未接入`,
      icon: "none",
      duration: 2000
    });
  },

  goBack() {
    wx.switchTab({
      url: "/pages/index/index"
    });
  }
});