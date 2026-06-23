document.addEventListener("DOMContentLoaded", () => {
  const leadForm = document.querySelector("#leadForm");
  const formMessage = document.querySelector("#formMessage");

  const LEAD_STORAGE_KEY = "aiLeadCustomers";
  const FORM_SERVICE_CONFIG = {
    // TODO：上线前请把下面地址替换为你的 Formspree 表单地址，例如：https://formspree.io/f/xxxxabcd
    // 获取方式：登录 https://formspree.io/ 创建表单，把接收线索的邮箱绑定到该表单。
    endpoint: "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID",
  };

  const isFormServiceConfigured = () =>
    FORM_SERVICE_CONFIG.endpoint &&
    !FORM_SERVICE_CONFIG.endpoint.includes("REPLACE_WITH_YOUR_FORM_ID");

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

  const sendLeadToFormService = async (lead) => {
    if (!isFormServiceConfigured()) {
      return;
    }

    const response = await fetch(FORM_SERVICE_CONFIG.endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: "新的AI获客咨询",
        name: lead.name,
        phone: lead.phone,
        industry: lead.industry,
        need: lead.need,
        submittedAt: lead.submittedAt,
      }),
    });

    if (!response.ok) {
      throw new Error("Lead delivery failed");
    }
  };

  const showSuccess = () => {
    formMessage.textContent = "提交成功，顾问将尽快联系您。";
    formMessage.hidden = false;
    leadForm.reset();
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
      await sendLeadToFormService(lead);
      saveLeadLocally(lead);
      showSuccess();
    } catch (error) {
      saveLeadLocally(lead);
      showSuccess();
    }
  });
});
