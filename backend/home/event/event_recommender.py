from sklearn.feature_extraction.text import TfidfVectorizer 
from sklearn.metrics.pairwise import cosine_similarity
from .models import Event 

def get_similar_events(event_id, top_n=10):
    vectorizer = TfidfVectorizer(stop_words="english")
    event_descriptions = Event.objects.all().values_list('description', flat=True)
    tfid_matrix = vectorizer.fit_transform(event_descriptions)
    print(tfid_matrix)
    target_event = Event.objects.get(event_id=event_id)
    all_event = list(Event.objects.all())
    target_index = all_event.index(target_event)
    consine_sim = cosine_similarity(tfid_matrix[target_index], tfid_matrix).flatten()
    similar_indices = consine_sim.argsort()[-top_n-1:-1][::-1]
    #print(similar_indices)
    similar_indices = [i for i in similar_indices if i != target_index]
    similar_event = []
    for idx in similar_indices:
        similar_event.append(all_event[idx])
    return similar_event 


