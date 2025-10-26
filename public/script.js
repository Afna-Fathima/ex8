document.addEventListener('DOMContentLoaded', () => {
    const plansContainer = document.getElementById('plansContainer');
    const planForm = document.getElementById('planForm');
    const apiUrl = window.location.hostname === 'localhost' 
        ? '/api/plans' 
        : 'https://your-backend-url/api/plans';

    // Function to FETCH (READ) all plans and render them
    const fetchPlans = async () => {
        plansContainer.innerHTML = 'Loading plans...';
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch plans');
            
            const plans = await response.json();
            
            plansContainer.innerHTML = ''; // Clear existing content
            
            if (plans.length === 0) {
                plansContainer.innerHTML = '<p>No plans found. Add one above!</p>';
                return;
            }

            plans.forEach(plan => {
                const planCard = document.createElement('div');
                planCard.className = 'plan-card';
                planCard.innerHTML = `
                    <div class="plan-info">
                        <strong>Client:</strong> ${plan.clientName} | 
                        <strong>Plan:</strong> ${plan.planName} | 
                        <strong>Duration:</strong> ${plan.durationWeeks} Weeks | 
                        <strong>Focus:</strong> ${plan.focusArea}
                    </div>
                    <button class="delete-btn" data-id="${plan._id}">Delete</button>
                `;
                plansContainer.appendChild(planCard);
            });
        } catch (error) {
            console.error('Error fetching plans:', error);
            plansContainer.innerHTML = `<p style="color: red;">Error loading plans: ${error.message}. Is the server and MongoDB running?</p>`;
        }
    };

    // Handle form submission to CREATE (INSERT) a new plan
    planForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const planData = {
            clientName: document.getElementById('clientName').value,
            planName: document.getElementById('planName').value,
            durationWeeks: parseInt(document.getElementById('durationWeeks').value),
            focusArea: document.getElementById('focusArea').value,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(planData),
            });

            if (!response.ok) throw new Error('Failed to create plan');

            // Clear the form and refresh the list
            planForm.reset();
            fetchPlans();
        } catch (error) {
            alert(`Error creating plan: ${error.message}`);
            console.error('Error creating plan:', error);
        }
    });

    // Handle DELETE operation via event delegation
    plansContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const planId = e.target.dataset.id;
            
            if (!confirm(`Are you sure you want to delete plan ID: ${planId}?`)) {
                return; // User cancelled
            }

            try {
                const response = await fetch(`${apiUrl}/${planId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Failed to delete plan');

                // Refresh the list after successful deletion
                fetchPlans();
            } catch (error) {
                alert(`Error deleting plan: ${error.message}`);
                console.error('Error deleting plan:', error);
            }
        }
    });

    // Initial call to load the plans when the page loads
    fetchPlans();
});