document.addEventListener("DOMContentLoaded", () => {
  const leadForm = document.querySelector("#leadForm");
  const formMessage = document.querySelector("#formMessage");

  const LEAD_STORAGE_KEY = "aiLeadCustomers";
  const CONTACT_CONFIG = {
    mode: "local", // 可选：local、email、wechatWebhook
    email: "",
    wechatWebhookUrl: "",
  };

  const getStoredLeads = () => {
    try {
      return JSON.parse(localStorage.getItem(LEAD_STORAGE_KEY)) || [];
    } catch (error) {
      return [];
    }
  };

  const saveLeadLocally = (lead) => {
    const leads = getStoredLeads();
    leads.unshift(lead);
    localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(leads));
  };

  const sendLeadByEmail = (lead) => {
    if (!CONTACT_CONFIG.email) {
      return;
    }

    const subject = encodeURIComponent(`新的AI获客咨询：${lead.name}`);
    const body = encodeURIComponent(
      [
        `姓名：${lead.name}`,
        `电话：${lead.phone}`,
        `行业：${lead.industry}`,
        `需求：${lead.need}`,
        `提交时间：${lead.submittedAt}`,
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  const sendLeadToWechat = async (lead) => {
    if (!CONTACT_CONFIG.wechatWebhookUrl) {
      return;
    }

    await fetch(CONTACT_CONFIG.wechatWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msgtype: "text",
        text: {
          content: [
            "新的AI获客咨询",
            `姓名：${lead.name}`,
            `电话：${lead.phone}`,
            `行业：${lead.industry}`,
            `需求：${lead.need}`,
            `提交时间：${lead.submittedAt}`,
          ].join("\n"),
        },
      }),
    });
  };

  const handleLeadDelivery = async (lead) => {
    saveLeadLocally(lead);

    if (CONTACT_CONFIG.mode === "email") {
      sendLeadByEmail(lead);
    }

    if (CONTACT_CONFIG.mode === "wechatWebhook") {
      await sendLeadToWechat(lead);
    }
  };

  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const lead = {
      name: formData.get("name").trim(),
      phone: formData.get("phone").trim(),
      industry: formData.get("industry").trim(),
      need: formData.get("need").trim(),
      submittedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
    };

    try {
      await handleLeadDelivery(lead);
      formMessage.textContent = "提交成功，顾问将尽快联系您。";
      formMessage.hidden = false;
      leadForm.reset();
    } catch (error) {
      formMessage.textContent = "提交成功，顾问将尽快联系您。";
      formMessage.hidden = false;
      leadForm.reset();
    }
  });
});
