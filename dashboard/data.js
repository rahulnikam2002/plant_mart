export const productSeries = [
  {
    name: "Products",
    data: [100, 400, 450, 500, 490, 600, 700]
  }
];

export const productOption = {
  chart: {
    id: "basic-bar",
    background: "transparent",
    foreColor: "transparent",
    sparkline: {
      enabled: false
    },
    toolbar: {
      show: true
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    show: false, // you can either change hear to disable all grids
    xaxis: {
      borderColor: "#000",

      lines: {
        show: false //or just here to disable only x axis grids
      }
    },
    yaxis: {
      borderColor: "#000",
      lines: {
        show: false //or just here to disable only y axis
      }
    }
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: 8
    }
  },
  stroke: {
    curve: "smooth",
    colors: ["transparent"]
    // width: 20
  },
  fill: {
    colors: ["rgb(34, 197, 94)", "#B32824"]
  }
};

export const ordersSeries = [
  {
    name: "Orders",
    data: [1000, 4000, 4050, 5000, 4900, 6000, 7000]
  }
];

export const ordersOption = {
  chart: {
    id: "basic-bar",
    background: "transparent",
    foreColor: "transparent",
    sparkline: {
      enabled: false
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 0,
      color: "#000",
      opacity: 0.35
    },
    toolbar: {
      show: true
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    show: false, // you can either change hear to disable all grids
    xaxis: {
      borderColor: "#000",

      lines: {
        show: false //or just here to disable only x axis grids
      }
    },
    yaxis: {
      borderColor: "#000",
      lines: {
        show: false //or just here to disable only y axis
      }
    }
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: 8,
      shadow:
        "box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;"
    }
  },
  stroke: {
    curve: "smooth",
    colors: ["transparent"]
    // width: 20
  },
  fill: {
    colors: ["#FF0066"]
  }
};

export const earningSeries = [
  {
    name: "Earnings",
    data: [100000, 400000, 300000, 200000, 490000, 600000, 791500]
  }
];

export const earningsOption = {
  chart: {
    id: "basic-bar",
    background: "transparent",
    foreColor: "transparent",
    sparkline: {
      enabled: false
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 0,
      color: "#000",
      opacity: 0.35
    },
    toolbar: {
      show: true
    }
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    show: false, // you can either change hear to disable all grids
    xaxis: {
      borderColor: "#000",

      lines: {
        show: false //or just here to disable only x axis grids
      }
    },
    yaxis: {
      borderColor: "#000",
      lines: {
        show: false //or just here to disable only y axis
      }
    }
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: 7,
      shadow:
        "box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;"
    }
  },
  stroke: {
    curve: "smooth",
    colors: ["transparent"]
    // width: 20
  },
  fill: {
    colors: ["#0F62FE"]
  }
};

export const yearlyAnalysisSeries = [
  {
    name: "Net Profit",
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  },
  {
    name: "Orders",
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  },
  {
    name: "Shipping",
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }
];

export const yearlyAnalysisOption = {
  chart: {
    type: "bar",
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded"
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"]
  },
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
  },
  yaxis: {
    title: {
      text: "₹ (Thousand     )"
    }
  },
  fill: {
    opacity: 1
  }
};
