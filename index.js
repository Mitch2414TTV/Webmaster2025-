const resources = [
  {
    name: 'Fredericksburg Food Cooperative',
    category: 'Basic Needs',
    focus: 'Food access',
    description: 'Weekly pantry boxes, fresh produce partners, and nutrition workshops for area code 17026 families.',
    featured: true,
  },
  {
    name: 'Northern Lebanon Youth Mentors',
    category: 'Youth & Education',
    focus: 'After-school support',
    description: 'Tutoring, STEM clubs, and scholarships connecting students with local volunteers.',
    featured: true,
  },
  {
    name: 'Caring Neighbors Hotline',
    category: 'Health & Wellness',
    focus: 'Mental health',
    description: 'Warmline staffed by trained peers plus referrals to counselors and crisis support within the 17026 region.',
    featured: true,
  },
  {
    name: 'Fredericksburg Community Center',
    category: 'Community & Culture',
    focus: 'Events & recreation',
    description: 'Space for block parties, art nights, meeting rooms, and an affordable venue for local groups.',
  },
  {
    name: 'Lebanon County Transit Link',
    category: 'Transportation',
    focus: 'Mobility assistance',
    description: 'Reduced-fare routes, rural ride requests, and senior transport options covering Fredericksburg and nearby towns.',
  },
  {
    name: 'Pathways Legal Clinic',
    category: 'Family Services',
    focus: 'Housing & legal aid',
    description: 'Monthly pop-up clinic for tenant rights, benefit applications, and document prep.',
  },
  {
    name: 'Valley JobWorks',
    category: 'Employment',
    focus: 'Career navigation',
    description: 'Resume labs, employer meetups, and apprenticeships with local manufacturing partners.',
  },
  {
    name: 'Fredericksburg Farmers Market',
    category: 'Community & Culture',
    focus: 'Local food',
    description: 'Seasonal market on Main Street featuring local growers, makers, and musicians.',
  },
];

const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const focusSelect = document.getElementById('focus');
const resourceList = document.getElementById('resource-list');
const resultsCount = document.getElementById('results-count');
const highlightContainer = document.getElementById('highlight-cards');
const form = document.getElementById('resource-form');
const formStatus = document.getElementById('form-status');
const categoryField = document.getElementById('category-field');

const categories = Array.from(new Set(resources.map((r) => r.category))).sort();
const focuses = Array.from(new Set(resources.map((r) => r.focus))).sort();

function populateFilters() {
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
    const formOption = option.cloneNode(true);
    categoryField.appendChild(formOption);
  });

  focuses.forEach((focus) => {
    const option = document.createElement('option');
    option.value = focus;
    option.textContent = focus;
    focusSelect.appendChild(option);
  });
}

function createResourceCard(resource) {
  const card = document.createElement('article');
  card.className = 'card resource-card';
  card.innerHTML = `
    <h3>${resource.name}</h3>
    <p>${resource.description}</p>
    <div class="tag-group">
      <span class="tag">${resource.category}</span>
      <span class="tag">${resource.focus}</span>
    </div>
  `;
  return card;
}

function renderResources() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const focus = focusSelect.value;

  const filtered = resources.filter((resource) => {
    const matchesQuery = resource.name.toLowerCase().includes(query) || resource.description.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || resource.category === category;
    const matchesFocus = focus === 'all' || resource.focus === focus;
    return matchesQuery && matchesCategory && matchesFocus;
  });

  resourceList.innerHTML = '';
  if (!filtered.length) {
    resourceList.innerHTML = '<p class="card">No resources match that search yet. Try another filter or submit a new resource.</p>';
  } else {
    filtered.forEach((resource) => resourceList.appendChild(createResourceCard(resource)));
  }
  resultsCount.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'} shown`;
}

function renderHighlights() {
  const featured = resources.filter((resource) => resource.featured);
  featured.forEach((resource) => {
    const card = document.createElement('article');
    card.className = 'card highlight-card';
    card.innerHTML = `
      <h3>${resource.name}</h3>
      <p>${resource.description}</p>
      <span class="tag">${resource.focus}</span>
    `;
    highlightContainer.appendChild(card);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const category = formData.get('category');
  const description = formData.get('description').trim();
  const focus = formData.get('focus').trim();

  if (!name || !email || !category || !description) {
    formStatus.textContent = 'Please complete all required fields.';
    formStatus.style.color = '#fca5a5';
    return;
  }

  form.reset();
  formStatus.textContent = `Thanks, ${name}! We received your resource and will review it for the 17026 hub.`;
  formStatus.style.color = 'var(--accent-2)';
}

populateFilters();
renderResources();
renderHighlights();

searchInput.addEventListener('input', renderResources);
categorySelect.addEventListener('change', renderResources);
focusSelect.addEventListener('change', renderResources);
form.addEventListener('submit', handleFormSubmit);
