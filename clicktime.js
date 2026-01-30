class MatrixRain {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$€£¥₩<>[]{}()/*+-=~!@#%^&*";
    this.drops = [];
    this.isActive = true;
    this.initialize();
  }

  initialize() {
    this.createDrops();
    this.animate();

    window.addEventListener("resize", () => {
      this.clearDrops();
      this.createDrops();
    });
  }

  createDrops() {
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);

    for (let i = 0; i < columns; i++) {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.style.left = `${i * fontSize}px`;
      drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
      drop.style.animationDelay = `${Math.random() * 5}s`;
      drop.textContent =
        this.chars[Math.floor(Math.random() * this.chars.length)];

      this.container.appendChild(drop);
      this.drops.push({
        element: drop,
        speed: Math.random() * 3 + 1,
        length: Math.floor(Math.random() * 30) + 10,
      });
    }
  }

  clearDrops() {
    this.container.innerHTML = "";
    this.drops = [];
  }

  animate() {
    if (!this.isActive) return;

    this.drops.forEach((drop, index) => {
      const top = parseFloat(drop.element.style.top) || -50;

      if (top > window.innerHeight) {
        drop.element.style.top = "-50px";
        drop.element.textContent =
          this.chars[Math.floor(Math.random() * this.chars.length)];
      } else {
        drop.element.style.top = `${top + drop.speed}px`;

        if (Math.random() > 0.97) {
          drop.element.textContent =
            this.chars[Math.floor(Math.random() * this.chars.length)];
          drop.element.style.color =
            Math.random() > 0.5 ? "var(--primary)" : "var(--secondary)";
          drop.element.style.textShadow = `0 0 10px ${drop.element.style.color}`;
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }

  toggle() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.animate();
    }
  }
}

class CyberNotificationSystem {
  constructor() {
    this.container = document.getElementById("notificationContainer");
    this.queue = [];
    this.isShowing = false;
  }

  show(type, message, duration = 4000) {
    const notification = {
      id: Date.now() + Math.random(),
      type,
      message,
      duration,
      timestamp: new Date(),
    };

    this.queue.push(notification);
    this.processQueue();
  }

  processQueue() {
    if (this.isShowing || this.queue.length === 0) return;

    this.isShowing = true;
    const notification = this.queue.shift();
    this.createNotification(notification);
  }

  createNotification(notification) {
    const element = document.createElement("div");
    element.className = `notification type-${notification.type}`;
    element.id = `notification-${notification.id}`;

    const config = {
      success: {
        icon: "fa-check-circle",
        title: "THÀNH CÔNG",
        color: "var(--primary)",
      },
      error: {
        icon: "fa-exclamation-triangle",
        title: "LỖI",
        color: "var(--danger)",
      },
      warning: {
        icon: "fa-radiation",
        title: "CẢNH BÁO",
        color: "var(--warning)",
      },
      info: {
        icon: "fa-info-circle",
        title: "THÔNG BÁO",
        color: "var(--secondary)",
      },
    }[notification.type];

    element.innerHTML = `
            <div class="notification-header">
                <div class="notification-title" style="color: ${config.color}">
                    <i class="fas ${config.icon}"></i>
                    ${config.title}
                    <span class="notification-time">${this.formatTime(notification.timestamp)}</span>
                </div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-body">${notification.message}</div>
            <div class="notification-progress"></div>
        `;

    this.container.appendChild(element);

    if (Math.random() > 0.7) {
      element.classList.add("glitch");
    }

    requestAnimationFrame(() => {
      element.classList.add("show");

      const progress = element.querySelector(".notification-progress");
      progress.style.animation = `progress ${notification.duration}ms linear`;
    });

    setTimeout(() => {
      element.classList.remove("show");
      setTimeout(() => {
        element.remove();
        this.isShowing = false;
        this.processQueue();
      }, 500);
    }, notification.duration);
  }

  formatTime(date) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  success(message) {
    this.show("success", message);
  }
  error(message) {
    this.show("error", message);
  }
  warning(message) {
    this.show("warning", message);
  }
  info(message) {
    this.show("info", message);
  }
}

class QuantumPasswordSystem {
  constructor() {
    this.password = "bht.com";
    this.isRevealed = false;
    this.timeout = null;
    this.display = document.getElementById("passwordDisplay");
    this.wrapper = document.getElementById("passwordWrapper");
    this.initialize();
  }

  initialize() {
    this.wrapper.addEventListener("click", () => this.toggle());

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        this.toggle();
      }
    });

    this.wrapper.addEventListener("mouseenter", () => {
      if (!this.isRevealed) {
        this.display.style.textShadow = "0 0 20px var(--primary)";
      }
    });

    this.wrapper.addEventListener("mouseleave", () => {
      if (!this.isRevealed) {
        this.display.style.textShadow = "";
      }
    });
  }

  async toggle() {
    if (!this.isRevealed) {
      await this.reveal();
    } else {
      this.hide();
    }
  }

  async reveal() {
    this.display.textContent = "";
    this.display.classList.add("revealed");

    for (let i = 0; i < this.password.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));

      if (Math.random() > 0.9) {
        this.display.textContent += this.getRandomChar();
        await new Promise((resolve) => setTimeout(resolve, 50));
        this.display.textContent = this.display.textContent.slice(0, -1);
      }

      this.display.textContent += this.password[i];
    }

    this.isRevealed = true;
    notification.success("Đã giải mã thành công!");

    try {
      await navigator.clipboard.writeText(this.password);
      notification.info("Đã sao chép vào clipboard");
    } catch (err) {
      notification.warning("Không thể truy cập clipboard");
    }

    this.timeout = setTimeout(() => this.hide(), 15000);
  }

  hide() {
    clearTimeout(this.timeout);
    this.display.textContent = "******";
    this.display.classList.remove("revealed");
    this.isRevealed = false;
    notification.info("Đã ẩn mã");
  }

  getRandomChar() {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    return chars[Math.floor(Math.random() * chars.length)];
  }
}

class QuantumDownloadManager {
  constructor() {
    this.downloading = false;
    this.initialize();
  }

  initialize() {
    document.querySelectorAll(".download-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const fileId = e.currentTarget.dataset.fileId;
        const filename = e.currentTarget.dataset.filename;
        this.downloadFile(fileId, filename, e.currentTarget);
      });
    });
  }

  async downloadFile(fileId, filename, button) {
    if (this.downloading) {
      notification.warning("Vui lòng đợi tải xong file hiện tại");
      return;
    }

    this.downloading = true;
    const originalText = button.innerHTML;

    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ĐANG KẾT NỐI...`;
    button.disabled = true;

    try {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = "none";

      document.body.appendChild(link);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20 + 5;

        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          link.click();

          setTimeout(() => {
            this.downloadComplete(button, originalText, filename);
            document.body.removeChild(link);
          }, 500);
        }

        button.innerHTML = `
                    <i class="fas fa-download"></i>
                    ĐANG TẢI... ${Math.floor(progress)}%
                    <div class="progress-bar" style="width: ${progress}%"></div>
                `;
      }, 120);
    } catch (error) {
      console.error("Download error:", error);
      notification.error("Lỗi tải file");
      this.resetButton(button, originalText);
    }
  }

  downloadComplete(button, originalText, filename) {
    this.downloading = false;

    button.innerHTML = `<i class="fas fa-check"></i> HOÀN TẤT!`;
    button.style.background =
      "linear-gradient(135deg, rgba(0,255,136,0.3), rgba(0,217,255,0.3))";
    button.style.borderColor = "var(--primary)";

    notification.success(`Đã tải: ${filename}`);

    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.style.background = "";
      button.style.borderColor = "";
    }, 2000);
  }

  resetButton(button, originalText) {
    this.downloading = false;
    button.innerHTML = originalText;
    button.disabled = false;
  }
}

class SystemMonitor {
  constructor() {
    this.cpuElement = document.getElementById("cpuLoad");
    this.ramElement = document.getElementById("ramUsage");
    this.networkElement = document.getElementById("networkSpeed");
    this.dataElement = document.getElementById("dataIntegrity");
    this.powerElement = document.getElementById("powerLevel");
    this.networkStatusElement = document.getElementById("networkStatus");
    this.initialize();
  }

  initialize() {
    this.updateStats();
    setInterval(() => this.updateStats(), 3000);
  }

  updateStats() {
    const cpu = 20 + Math.random() * 40;
    const ram = 50 + Math.random() * 40;
    const network = (0.8 + Math.random() * 1.5).toFixed(1);
    const data = (99 + Math.random()).toFixed(1);
    const power = Math.random() > 0.1 ? 100 : 90 + Math.random() * 10;

    this.cpuElement.textContent = `${Math.floor(cpu)}%`;
    this.ramElement.textContent = `${Math.floor(ram)}%`;
    this.networkElement.textContent = `${network}Gbps`;
    this.dataElement.textContent = `${data}%`;
    this.powerElement.textContent = `${Math.floor(power)}%`;

    if (network > 2) {
      this.networkStatusElement.textContent = "SIÊU TỐC";
      this.networkStatusElement.style.color = "var(--primary)";
    } else if (network > 1) {
      this.networkStatusElement.textContent = "ỔN ĐỊNH";
      this.networkStatusElement.style.color = "var(--secondary)";
    } else {
      this.networkStatusElement.textContent = "CHẬM";
      this.networkStatusElement.style.color = "var(--warning)";
    }
  }
}

let matrixRain, notification, passwordSystem, downloadManager, systemMonitor;

document.addEventListener("DOMContentLoaded", () => {
  matrixRain = new MatrixRain("codeRain");
  notification = new CyberNotificationSystem();
  passwordSystem = new QuantumPasswordSystem();
  downloadManager = new QuantumDownloadManager();
  systemMonitor = new SystemMonitor();

  window.matrixRain = matrixRain;
  window.notification = notification;
  window.passwordSystem = passwordSystem;
  window.downloadManager = downloadManager;
  window.systemMonitor = systemMonitor;

  setTimeout(() => {
    notification.success("ClickTime - HỆ THỐNG ĐÃ SẴN SÀNG");
  }, 500);

  setTimeout(() => {
    notification.warning(
      "CẢNH BÁO: Chỉ hiển thị mật mã cho người dùng được ủy quyền",
    );
  }, 3000);

  const systemPath = document.querySelector(".system-path");
  const originalPath = systemPath.textContent;
  systemPath.textContent = "";

  let i = 0;
  function typePath() {
    if (i < originalPath.length) {
      if (Math.random() > 0.95) {
        systemPath.textContent =
          originalPath.substring(0, i) +
          String.fromCharCode(65 + Math.floor(Math.random() * 26));
        setTimeout(() => {
          systemPath.textContent = originalPath.substring(0, i);
        }, 50);
      }

      systemPath.textContent = originalPath.substring(0, i + 1);
      i++;
      setTimeout(typePath, 50);
    }
  }
  setTimeout(typePath, 800);

  document.addEventListener("keydown", (e) => {
    if (e.key === "F1" || (e.ctrlKey && e.key === "h")) {
      e.preventDefault();
      notification.info(`
                PHÍM TẮT HỆ THỐNG:<br>
                • Ctrl+K: Hiện/ẩn mật mã<br>
                • 1-3: Tải file tương ứng<br>
                • F1: Hiện thông báo này<br>
                • ESC: Ẩn mật mã<br>
                • Ctrl+R: Làm mới hệ thống
            `);
    }

    if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      notification.warning("Làm mới hệ thống...");
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  });

  window.addEventListener("load", () => {
    const loadTime = performance.now();
    notification.success(`Hệ thống tối ưu hóa: ${Math.round(loadTime)}ms`);
  });

  window.addEventListener("resize", () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {}, 250);
  });

  window.addEventListener("online", () => {
    notification.success("Đã khôi phục kết nối mạng");
  });

  window.addEventListener("offline", () => {
    notification.error("MẤT KẾT NỐI MẠNG - Chuyển sang chế độ offline");
  });
});

window.addEventListener("error", (e) => {
  console.error("Hệ thống lỗi:", e.error);
  if (window.notification) {
    window.notification.error(`Lỗi hệ thống: ${e.message}`);
  }
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise bị từ chối:", e.reason);
  if (window.notification) {
    window.notification.error(`Lỗi promise: ${e.reason}`);
  }
});
